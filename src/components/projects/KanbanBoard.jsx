import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const KanbanBoard = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTaskColumn, clients, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeMobileCol, setActiveMobileCol] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // New task form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientId: clients[0]?.id || '',
    priority: 'medium',
    column: 'backlog',
    dueDate: new Date().toISOString().split('T')[0],
    estimatedHours: 8,
  });

  const columns = [
    {
      id: 'backlog',
      title: t('projects.columns.backlog'),
      color: 'border-slate-300 dark:border-slate-700',
      badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    },
    {
      id: 'inProgress',
      title: t('projects.columns.inProgress'),
      color: 'border-indigo-400 dark:border-indigo-700',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300',
    },
    {
      id: 'review',
      title: t('projects.columns.review'),
      color: 'border-amber-400 dark:border-amber-700',
      badgeBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300',
    },
    {
      id: 'done',
      title: t('projects.columns.done'),
      color: 'border-emerald-400 dark:border-emerald-700',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
    },
  ];

  // Filtering
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.clientName && task.clientName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const openCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      clientId: clients[0]?.id || '',
      priority: 'medium',
      column: 'backlog',
      dueDate: new Date().toISOString().split('T')[0],
      estimatedHours: 8,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      clientId: task.clientId,
      priority: task.priority,
      column: task.column,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedClient = clients.find((c) => c.id === formData.clientId);
    const clientName = selectedClient ? selectedClient.company : 'Direct Client';

    if (editingTask) {
      updateTask(editingTask.id, {
        ...formData,
        clientName,
      });
    } else {
      addTask({
        ...formData,
        clientName,
      });
    }
    setIsModalOpen(false);
  };

  const getNextColumn = (currentCol) => {
    if (currentCol === 'backlog') return 'inProgress';
    if (currentCol === 'inProgress') return 'review';
    if (currentCol === 'review') return 'done';
    return null;
  };

  const getPrevColumn = (currentCol) => {
    if (currentCol === 'done') return 'review';
    if (currentCol === 'review') return 'inProgress';
    if (currentCol === 'inProgress') return 'backlog';
    return null;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('projects.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('projects.subtitle')}
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t('projects.addTaskBtn')}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('projects.searchPlaceholder')}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
          >
            <option value="all">{t('common.all')} {t('common.priority')}</option>
            <option value="urgent">{t('common.urgent')}</option>
            <option value="high">{t('common.high')}</option>
            <option value="medium">{t('common.medium')}</option>
            <option value="low">{t('common.low')}</option>
          </select>
        </div>
      </div>

      {/* Mobile Column Quick-Selector Tabs */}
      <div className="flex xl:hidden items-center gap-1.5 overflow-x-auto pb-1 -mx-2 px-2 no-scrollbar">
        <button
          onClick={() => setActiveMobileCol('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
            activeMobileCol === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('common.all')} ({filteredTasks.length})
        </button>
        {columns.map((c) => {
          const count = filteredTasks.filter((t) => t.column === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setActiveMobileCol(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                activeMobileCol === c.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>{c.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeMobileCol === c.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 items-start">
        {columns.map((column) => {
          const colTasks = filteredTasks.filter((t) => t.column === column.id);
          const isHiddenOnMobile = activeMobileCol !== 'all' && activeMobileCol !== column.id;

          if (isHiddenOnMobile) return null;

          return (
            <div
              key={column.id}
              className="flex flex-col rounded-2xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 p-3.5 sm:p-4 min-h-[300px] xl:min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${column.badgeBg}`}>
                    {column.title}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {colTasks.length}
                </span>
              </div>

              {/* Column Tasks */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                    <span>{t('dashboard.noTasks')}</span>
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const nextCol = getNextColumn(task.column);
                    const prevCol = getPrevColumn(task.column);

                    return (
                      <div
                        key={task.id}
                        className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group space-y-3"
                      >
                        {/* Header: Priority & Actions */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              task.priority === 'urgent'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300'
                                : task.priority === 'high'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300'
                                : task.priority === 'medium'
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {t(`common.${task.priority}`)}
                          </span>

                          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEditModal(task)}
                              title={t('common.edit')}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              title={t('common.delete')}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Task Title & Description */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Client info & Due date */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate max-w-[120px]">
                            {task.clientName}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3" />
                              {task.dueDate}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Move Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/50">
                          {prevCol ? (
                            <button
                              onClick={() => moveTaskColumn(task.id, prevCol)}
                              className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span>{t('projects.moveTo')}</span>
                            </button>
                          ) : (
                            <span />
                          )}

                          {nextCol ? (
                            <button
                              onClick={() => moveTaskColumn(task.id, nextCol)}
                              className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              <span>{t('projects.moveTo')}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{t('common.completed')}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? t('projects.editModalTitle') : t('projects.modalTitle')}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('projects.taskTitle')} *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Design Payment Checkout Flow"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('projects.taskDesc')}
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed deliverables, requirements, or links..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('projects.clientSelect')}
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('projects.priorityLabel')}
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="urgent">{t('common.urgent')}</option>
                <option value="high">{t('common.high')}</option>
                <option value="medium">{t('common.medium')}</option>
                <option value="low">{t('common.low')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('projects.dueDateLabel')}
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('projects.statusLabel')}
              </label>
              <select
                value={formData.column}
                onChange={(e) => setFormData({ ...formData, column: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="backlog">{t('projects.columns.backlog')}</option>
                <option value="inProgress">{t('projects.columns.inProgress')}</option>
                <option value="review">{t('projects.columns.review')}</option>
                <option value="done">{t('projects.columns.done')}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition"
            >
              {editingTask ? t('common.save') : t('common.add')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
