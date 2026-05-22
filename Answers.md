### Q1
To run the project, detailed instructions are listed in Readme.md file. To summarize, it is have node installed, install dependencies, build the project and then go inside the dist folder and run index.js file with node. To see a list of options, use the -h flag. 

### Q2
I chose to made this project with node.js, they reason being that I have already built things with this stack and I am comfortable working with this stack. A worse option could have been trying to use C++ for this project. Choosing C++ would have made this unneccarily hard and I don't have enough experience with C++ either on the dev side.

### Q3
In index.ts file inside src folder, on line 70, I have defined a checkArgs function. This function is crucial and is used throughout. Without this, I can't reliably check for the required arguments for the operations, which would lead to incorrect results. 

### Q4
I used AI to confirm the function used for creating a new file using code. I used chatgpt, it told me to use the fs.writeFileSync function. Then I modified the code to include the path of my file, and for the content, I had an empty array []. I used it in one more place, inside types.ts file, I asked chatgpt that how can I have different but limited string values for the status field. It told me to use ENUMS, which seemed overkill so I went with a simple OR operator between all valid values. 

### Q5
One thing missing is that I haven't done too thorough validation of passed in args. Also, this project lacks authentication, if intended to be used by multiple people at the same time, there should definitely be some sort of auth involved, but given the time constraints, I thought it best to skip. 

### Feature I would want as a User
I would want from a CLI like this the ability to filter based on the status of task, like list all the tasks that I have to do or list in-progress tasks. I went beyond basic CRUD and implemented this using the listTasks function which takes in a optional status parameter, which if passed filters the task. 