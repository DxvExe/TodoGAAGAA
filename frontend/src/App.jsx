import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';
import { taskApi } from './services/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [allTasksForCounts, setAllTasksForCounts] = useState([]);

  const fetchCounts = useCallback(async () => {
    try {
      const response = await taskApi.getTasks({});
      if (response && response.data) {
        setAllTasksForCounts(response.data);
      }
    } catch {
    }
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskApi.getTasks({
        search: searchQuery,
        status: currentFilter
      });
      setTasks(response.data || []);
      fetchCounts();
    } catch (err) {
      setError(err.message || 'Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, currentFilter, fetchCounts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 250);

    return () => clearTimeout(timer);
  }, [loadTasks]);

  const counts = {
    total: allTasksForCounts.length,
    completed: allTasksForCounts.filter((t) => t.completed).length,
    pending: allTasksForCounts.filter((t) => !t.completed).length
  };

  const handleCreateOrUpdateTask = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingTask) {
        const id = editingTask.id || editingTask._id;
        await taskApi.updateTask(id, {
          ...formData,
          completed: editingTask.completed
        });
      } else {
        await taskApi.createTask(formData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      setError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (taskId, nextCompletedState) => {
    setTasks((prev) =>
      prev.map((t) => ((t.id || t._id) === taskId ? { ...t, completed: nextCompletedState } : t))
    );
    setAllTasksForCounts((prev) =>
      prev.map((t) => ((t.id || t._id) === taskId ? { ...t, completed: nextCompletedState } : t))
    );

    try {
      await taskApi.patchTask(taskId, { completed: nextCompletedState });
      await fetchCounts();
    } catch (err) {
      setError('Could not update status: ' + err.message);
      await loadTasks();
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    const id = deletingTask.id || deletingTask._id;
    setIsDeleting(true);
    try {
      await taskApi.deleteTask(id);
      setDeletingTask(null);
      await loadTasks();
    } catch (err) {
      setError('Could not delete task: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const isFiltered = currentFilter !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="app-container">
      <Sidebar
        currentFilter={currentFilter}
        onSelectFilter={setCurrentFilter}
        counts={counts}
      />

      <main className="main-content">
        <Header onOpenCreateModal={handleOpenCreateModal} />

        <div className="content-body">
          <StatsCard
            total={counts.total}
            completed={counts.completed}
            pending={counts.pending}
          />

          <div className="controls-bar">
            <SearchBar
              search={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={() => setSearchQuery('')}
            />

            <FilterBar
              currentFilter={currentFilter}
              onSelectFilter={setCurrentFilter}
            />
          </div>

          {error && <ErrorMessage message={error} onRetry={loadTasks} />}

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : tasks.length === 0 ? (
            <EmptyState
              onAddNew={handleOpenCreateModal}
              isFiltered={isFiltered}
            />
          ) : (
            <section className="task-list-section">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id || task._id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleOpenEditModal}
                  onDelete={setDeletingTask}
                />
              ))}
            </section>
          )}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleCreateOrUpdateTask}
        task={editingTask}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={deletingTask?.title || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default App;
