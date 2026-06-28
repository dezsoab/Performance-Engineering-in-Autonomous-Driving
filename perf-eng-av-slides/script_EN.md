# 1/12 Title slide
Hello everyone. Thank you for coming to my presentation. Today I am going to talk about Performance Engineering in Autonomous Driving.

In my bachelor's thesis, I built a robotic rover and compared two different things: vision data pipelines and LiDAR data pipelines. I measured how fast they process data and how much delay they have.

# 3/12 Motivation Slide
My main motivation for this topic comes from my personal life.
I drive a Tesla myself, which is capable of self-driving. 

You just give it a destination, and it brings you there. I was very curious about how this actually works. 

I wanted to experience myself how to design a system like this—of course, on a much smaller scale.  

In the automotive industry, there are two main variants of self-driving cars: 
- First, the 'Human' approach. This is used by Tesla. They use a vision-only system with cameras. A few years ago, they completely removed radars and ultrasonic sensors from the car, making it run only on camera vision. 
- Second, the 'Robot' approach. This is used by companies like Waymo. They rely heavily on active sensors like LiDAR instead of just cameras.  

That is exactly why I built this mini self-driving rover—which you can see right here in front of you (showing the physical rover to the audience). 

I wanted to test both philosophies against each other to see which approach is truly more fast, accurate, and trustworthy.

# 4/12 Problem Slide

(I am going to show the problem related to each sensor on the rover itself)

Now, I want to show the problems that each sensor faces on the rover itself.

## RQ1
The first question which I am also researching in the first research question is related to the accuracy.

Camera systems are very limited by context. If there is not enough light, or too much light, they can fail. Also, if you put the camera very close to an obstacle, it loses context and cannot tell what is in front of it.

This is what you can see on the 2 images here, that from a meter distance the model is capable of understanding that a bottle is in front if it as an obstacle, but as soon as I place the camera within 25cm of range in this example, the camera just simply does not have enough context to know what it is in front of it, hence missing the green bounding rectangle, indicating the presence of an obstacle, hence it would just drive and smash into it.... 

## RQ2

In the second research question I am investigating an other real world problem which is about reaction time. 

Research shows that for completely unexpected scenarios whilst driving, the average human needs around 1,5 seconds from realizing the incident until slamming the breakes or acting in any form.

For this experiment, I set a strict target. I wanted my software system to react 60 times faster than a human—aiming for a 25-millisecond limit. If an autonomous system cannot react significantly faster than a human, it is not inherently safer to use.

## RQ3

Finally, RQ3 focuses on Operational Robustness. 

This is an empirical question. I wanted to test how each sensor pipeline reacts in a truly uncontrolled environment. No written script, no pre-tested setups—just a real, dynamic world where self-driving vehicles must operate safely every single day.

# 5/12 Video demo


# 6/12 Architecture Slide 1

When I started, the initial biggest problem I faced was high loop jitter and a critical safety lag. This boiled down to running all operations together on a single thread.

As you can see in this table, the single-threaded loop had an average latency of 168.6 milliseconds. At our test speed, that means the rover traveled 10.1 centimeters completely blind between software cycles

The single biggest improvement was decoupling the heavy Input/Output operations from the main thread and creating a non-blocking queue for logging. This gave a massive 10x improvement in execution speed. It dropped our latency down to just 16.2 milliseconds and reduced the blind distance to only 1.0 centimeter.

# 7/12 Architecture Slide 2

On this slide, we see the architectural diagram of the system. Each colorful box you see represents a completely separate background thread:


Each colorful box that is running is running on a different thread.

- The LiDAR thread is reading in data ranges multiple times a second. This is polled by the main loop for further processing.

- The camera thread is also capturing the environment but with a camera and with it's own, optimized strategy. The results are then polled by the main loop. 

- The motor control thread is executing the commands received by the main loop. Meaning, stopping, accelerating etc.

- The logger thread is responsible for logging all the data that happens in the system.
Writing data to an SD card is very slow. By using a non-blocking queue, the loop pushes metrics instantly into RAM, and this thread writes to the CSV file in the background without slowing down our driving reflex

# 8/12 Min-trust model Slide

Now looking at a code example, this is a very important part of the implementation.

I did not only test each sensor pipeline completely alone, but I also combined them together to see if they can help each other... This combination happens here in the FusionStrategy class.

First, in the constructor, we instantiate both the LiDAR strategy and the camera strategy blocks.

Next, in the check_path method, we poll both sensors asynchronously one after the other to collect the front, left, and right distancesl.

For the sides, we trust entirely the LiDAR. This is because the monocular camera I am using has a narrower lens, so the LiDAR naturally sees a wider angle.

Then, we check if the camera is blind. If the camera faces a wall too closely or loses contrast, it returns a hardcoded error token of 999.

At the same time, we check if the LiDAR sees a wall within our safety buffer distance.

If the camera is blind but the LiDAR actively sees a wall, our logic performs an override. It revokes the camera's authority and passes the LiDAR's distance directly.

In any other normal situation, the system simply takes the minimum value between the LiDAR and the camera. We rely on the worst-case scenario. If the LiDAR reports 40 centimeters but the camera reports 38, the system trusts the lower number to maximize vehicle safety.

# 9/12 RQ1 Slide

Now we move to the results for our first research question, which is about accuracy.

The hypothesis was accepted. The combined fusion system achieved a much better overall safety statistic.

- First, the LiDAR-only mode suffered a 100% collision rate against obstacles sitting lower than its mounting point. It is physically incapable of seeing low-profile objects below its laser line. In reality, you simply cannot trust a single 2D LiDAR unless you mount multiple laser sensors at different heights on the vehicle..

- Second, the camera-only mode also suffered from fatal blind spots. If I started the rover nose-to-wall, it had no initial texture and failed. Or if an obstacle suddenly jumped directly in front of it, the camera did not have enough time or distance context to map it.

- Finally, the sensor fusion pipeline dropped the failure rate to just 10% . The only reasons it hit anything at all were physical chassis constraints—for example, the wheels sticking out on the sides getting caught on a table or chair leg during a turn.

As you can see in the diagram on the right, by merging the long-range active tracking of the LiDAR with the near-field vision mapping of the camera, we created a highly safe 'Fusion Zone' where both sensors perfectly complement each other's physical weaknesses.

# 10/12 RQ2 Slide

Now we move to our second research question, which is about computational efficiency.

The hypothesis was accepted. Through optimized algorithmic decisions and our multi-threaded architecture, we smashed the strict 25-millisecond latency target.

Here are the three main breakthroughs that made this possible

- First, the Memory Footprint. By downsampling our camera feed from 720p HD down to a minimal 320x230 resolution, we reduced the memory load by a massive 92%. This made the data small enough to fit directly into the Raspberry Pi's cache without choking the CPU

- Second, the Algorithmic Load. We don't need a heavy supercomputer to analyze every single pixel on the screen. By running a custom 3-Ray Scanline Analysis, the software checks only three vertical columns where the wheels and the front bumper travel. This reduced the workload from 73,600 pixels to just 690 pixels per loop.

- Third, the Execution Speed. As I mentioned before, moving hardware polling and data logging into background threads eliminated blocking wait-times completely. This gave us a whopping 10.4x speed increase, bringing our total loop processing latency down from 168.6 milliseconds to a highly stable 16.2 milliseconds.

# 11/12 RQ3 Slide

Now we look at our third research question, which tested operational robustness in an uncontrolled environment.

This hypothesis was also accepted.

Here is what happened to each mode during the tests:


- First, the Camera-only mode panicked. When it approached a featureless, flat white surface like a wall, the image contrast dropped to zero. The camera became texture-blind and triggered its built-in failsafe.

- Second, the LiDAR-only mode was stable. Because it uses active laser reflection, it did not care about colors or lack of texture. It actively tracked the physical wall boundary at all times, but it still lacked vertical awareness..

- Finally, the Sensor Fusion pipeline achieved a 93% system reliability score. When the camera panicked and sent a blind signal, our context-aware system automatically cross-referenced the data. Because the LiDAR reported that the space was actually clear, the algorithm revoked the camera's braking authority and kept driving smoothly.

This proved that our minimum trust model successfully handles environmental edge cases by letting the sensors double-check each other

# 12/12 Conclusion Slide
