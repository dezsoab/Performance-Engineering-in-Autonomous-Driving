The 10-Minute presentation flow to work towards:


Slide 1: The Opener

Content: The mandatory FH green template. Title, Name, Supervisor.

===
Slide 2: The Hook & Background

Action: Pick up the physical rover skeleton.

Content: Introduce the industry divide. Tell about the relevance as Tesla FSD is on the corner in the EU. Big companies throw supercomputers at autonomous driving (like Tesla's vision-only or heavy LiDAR setups -> here show images of both). But what happens when you try to put both a camera and a laser on a tiny, low-power edge device?

Keywords: Edge Computing, Sensor Fusion, The Perception Dilemma.

===
Slide 3: The Research Questions 

Content: Break down the specific weaknesses of each system

The Camera: Great for shapes, but suffers from texture blindness (e.g., driving into a white wall).

The LiDAR: Pinpoint accurate horizontally, but suffers from Z-axis blindness (e.g., missing a shoe on the floor).

The Constraint: I had to solve this while reacting in under 25 milliseconds... -> also reference where this number comes from and the perception time of the human sight/brain...

===
Slide 4: The Methods / Architecture 

Content: How I solved it without crashing the Raspberry Pi 5. Keep it high-level. Explain the Minimum Trust Model (assuming the worst-case scenario for safety) and the Context-Aware Override (letting the LiDAR override the camera if the camera panics at a blank wall). -> can also show some code snippets here with the intelligent highlighting of Slidev

Keywords: Minimum Trust Model, Multi-threaded Architecture.

===
Slide 5

Content: This is where I show the code. Show a clean, syntax-highlighted snippet. The 3-ray scanner logic is perfect here.

===
Slide 6: The Results 

Content: The sum of the presentation. Show the data comparing the isolated sensors vs. the fusion sensor.

Key Stats to Hit:

Isolated sensors resulted in collisions and phantom braking.

The fusion architecture navigated all edge cases with zero collisions. -> authority revokation worked perfectly

The multi-threaded setup crushed the 25ms limit, hitting a stable 16.2ms loop latency. -> could also show the benchmark before and after multi-threading

===
Slide 7: Conclusion & Closing 

Content: Wrap it up powerfully. State clearly that the hypothesis was proven: intelligent software architecture and fusion on a small edge device can overcome severe hardware limits and rival brute-force computation.

Closing: "Thank you for your time. I'd be happy to answer any questions."

Slide 8: References 

Content: Harvard citations (Tesla, NEON Science, Refactoring.Guru, etc.)
