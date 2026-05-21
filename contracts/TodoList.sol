// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {

    enum Priority { LOW, MEDIUM, HIGH }

    struct Task {
        uint256 id;
        string content;
        bool completed;
        Priority priority;
        uint256 createdAt;
        uint256 completedAt;
    }

    mapping(address => Task[]) private userTasks;
    mapping(address => uint256) public taskCount;

    event TaskCreated(address indexed owner, uint256 id, string content, Priority priority);
    event TaskCompleted(address indexed owner, uint256 id);
    event TaskDeleted(address indexed owner, uint256 id);
    event TaskUpdated(address indexed owner, uint256 id, string newContent);

    function createTask(string memory _content, Priority _priority) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        require(bytes(_content).length <= 280, "Content too long");

        uint256 id = taskCount[msg.sender];
        userTasks[msg.sender].push(Task({
            id: id,
            content: _content,
            completed: false,
            priority: _priority,
            createdAt: block.timestamp,
            completedAt: 0
        }));
        taskCount[msg.sender]++;
        emit TaskCreated(msg.sender, id, _content, _priority);
    }

    function toggleTask(uint256 _id) public {
        require(_id < userTasks[msg.sender].length, "Task does not exist");
        Task storage task = userTasks[msg.sender][_id];
        task.completed = !task.completed;
        task.completedAt = task.completed ? block.timestamp : 0;
        emit TaskCompleted(msg.sender, _id);
    }

    function updateTask(uint256 _id, string memory _newContent) public {
        require(_id < userTasks[msg.sender].length, "Task does not exist");
        require(bytes(_newContent).length > 0, "Content cannot be empty");
        require(!userTasks[msg.sender][_id].completed, "Cannot edit completed task");
        userTasks[msg.sender][_id].content = _newContent;
        emit TaskUpdated(msg.sender, _id, _newContent);
    }

    function deleteTask(uint256 _id) public {
        require(_id < userTasks[msg.sender].length, "Task does not exist");
        userTasks[msg.sender][_id].content = "";
        userTasks[msg.sender][_id].completed = true;
        emit TaskDeleted(msg.sender, _id);
    }

    function getMyTasks() public view returns (Task[] memory) {
        return userTasks[msg.sender];
    }

    function getTask(uint256 _id) public view returns (Task memory) {
        require(_id < userTasks[msg.sender].length, "Task does not exist");
        return userTasks[msg.sender][_id];
    }

    function getStats() public view returns (
        uint256 total,
        uint256 completed,
        uint256 pending
    ) {
        Task[] memory tasks = userTasks[msg.sender];
        uint256 comp = 0;
        uint256 active = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (bytes(tasks[i].content).length == 0) continue; 
            if (tasks[i].completed) comp++;
            else active++;
        }
        return (comp + active, comp, active);
    }
}
