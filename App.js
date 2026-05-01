import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Bebas');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Oops!', 'Kegiatan tidak boleh kosong 😊');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
      priority: priority,
    };

    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const getPriorityColor = (priority) => {
    if (priority === 'Segera') return '#ff4d6d';
    if (priority === 'Nanti') return '#ffa94d';
    return '#69db7c';
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        { borderLeftColor: getPriorityColor(item.priority), borderLeftWidth: 5 },
      ]}
    >
      <TouchableOpacity onPress={() => toggleDone(item.id)}>
        <Text style={[styles.taskText, item.completed && styles.doneText]}>
          {item.title}
        </Text>

        <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>
          {item.priority}
        </Text>

        {item.completed && (
          <Text style={styles.badge}>Selesai ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.delete}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>🌸 MyTaskList</Text>

      <Text style={styles.counter}>
        {completedCount} dari {tasks.length} selesai
      </Text>

      {/* INPUT + TOMBOL */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tambah kegiatan..."
          placeholderTextColor="#999"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* PRIORITAS */}
      <View style={styles.priorityContainer}>
        {['Segera', 'Nanti', 'Bebas'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.priorityBtn,
              priority === item && { backgroundColor: '#ff4d88' },
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={{
                color: priority === item ? '#fff' : '#ff4d88',
                fontWeight: 'bold',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada kegiatan 💗</Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d63384',
  },
  counter: {
    color: '#a61e4d',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffe3ec',
    padding: 12,
    borderRadius: 12,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#ff4d88',
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  priorityContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  priorityBtn: {
    flex: 1,
    padding: 10,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#ffe3ec',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  priority: {
    fontSize: 12,
    marginTop: 5,
  },
  badge: {
    fontSize: 12,
    color: '#ff4d88',
  },
  delete: {
    fontSize: 18,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#d63384',
  },
});