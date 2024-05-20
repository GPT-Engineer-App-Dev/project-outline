import { useState } from 'react';
import { Container, VStack, HStack, Input, Button, Checkbox, Text, Box } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" mt={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input 
            placeholder="Enter your task" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          />
          <Button onClick={handleAddTask} colorScheme="blue" leftIcon={<FaPlus />}>Add</Button>
        </HStack>
        {tasks.length === 0 ? (
          <Text color="gray.500">No tasks to display</Text>
        ) : (
          <VStack spacing={3} width="100%">
            {tasks.map((task, index) => (
              <HStack key={index} width="100%" justifyContent="space-between">
                <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(index)}>{task.text}</Checkbox>
                <Button colorScheme="red" onClick={() => handleDeleteTask(index)} leftIcon={<FaTrash />}>Delete</Button>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;