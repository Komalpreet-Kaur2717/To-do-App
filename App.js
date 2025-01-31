import React, { useState } from 'react';
import { TextInput,  FlatList,TouchableOpacity, Button,  Switch, StyleSheet,View, Text} from'react-native';

export default function App() 
{
  const[taskTitle,setTaskTitle] = useState('');
  const[tasks,setTasks] = useState([]);
  const[isSwitchOn,setIsSwitchOn] = useState(false);

  const handleAddTask = () => {
    if (!taskTitle) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      status: 'due',
    };

    setTasks([...tasks, newTask]);
    setTaskTitle(''); 
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'due' ? 'done' : 'due' } 
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter the task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <Button 
        title="Add Task" 
        onPress={handleAddTask} 
        disabled={!taskTitle}
      />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.taskActions}>
              <Switch
                value={item.status === 'done'}
                onValueChange={() => toggleTaskStatus(item.id)}
              />
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.taskStatus}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    textTransform:'capitalize',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  taskStatus: {
    marginTop: 10,
    fontStyle: 'italic',
  },
});
