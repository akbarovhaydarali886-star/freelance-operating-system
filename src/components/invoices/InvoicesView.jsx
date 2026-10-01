import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  Receipt,
  Plus,
  Search,
  Filter,
  Printer,
  CheckCircle2,
  Trash2,
  Eye,
  DollarSign,
  AlertCircle,
  FileText,
  Building,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const InvoicesView = () => {
  const {
    invoices,
    addInvoice,
    deleteInvoice,
    markInvoicePaid,
    clients,
    user,
    t,
    formatMoney,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState(null);

  // New Invoice Form state
  const [formData, setFormData] = useState({
    clientId: clients[0]?.id || '',
    currency: 'USD',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
    items: [
      { description: 'Web Application Frontend Development', qty: 1, rate: 1200 },
    ],
    taxRate: 5,
    notes: "To'lov uchun tashakkur! Bank rekvizitlari bo'yicha to'lov qabul qilinadi.",
  });

  // Calculate dynamic totals for create form
  const formSubtotal = formData.items.reduce(
    (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0),
    0
  );
  const formTaxAmount = Math.round((formSubtotal * (Number(formData.taxRate) || 0)) / 100);
  const formTotal = formSubtotal + formTaxAmount;

  // Add line item to form
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', qty: 1, rate: 0 }],
    });
  };

  // Remove line item
  const handleRemoveItem = (index) => {
    if (formData.items.length <= 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  // Update line item
  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = value;
    setFormData({ ...formData, items: updated });
  };

  // Submit invoice
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const selectedClient = clients.find((c) => c.id === formData.clientId);
    const clientName = selectedClient ? selectedClient.company : 'Direct Client';
    const clientEmail = selectedClient ? selectedClient.email : 'client@company.com';

    const itemsWithTotals = formData.items.map((it) => ({
      ...it,
      qty: Number(it.qty) || 1,
      rate: Number(it.rate) || 0,
      amount: (Number(it.qty) || 1) * (Number(it.rate) || 0),
    }));

    addInvoice({
      clientId: formData.clientId,
      clientName,
      clientEmail,
      currency: formData.currency,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      status: 'pending',
      items: itemsWithTotals,
      taxRate: Number(formData.taxRate) || 0,
      taxAmount: formTaxAmount,
      subtotal: formSubtotal,
      total: formTotal,
      notes: formData.notes,
    });

    setIsCreateOpen(false);
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Totals for top cards
  const totalPaidUSD = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => (i.currency === 'USD' ? sum + i.total : sum + i.total / 12500), 0);

  const totalPendingUSD = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => (i.currency === 'USD' ? sum + i.total : sum + i.total / 12500), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('invoices.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('invoices.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{t('invoices.createBtn')}</span>
        </button>
      </div>

      {/* Metric summary pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">
            {t('common.paid')} Revenue
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {formatMoney(totalPaidUSD)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">
            {t('common.pending')} Payments
          </span>
          <div className="text-2xl font-black text-amber-500 mt-1">
            {formatMoney(totalPendingUSD)}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Total Invoices</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {invoices.length} Invoices
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search')}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
          >
            <option value="all">{t('common.all')} {t('common.status')}</option>
            <option value="paid">{t('common.paid')}</option>
            <option value="pending">{t('common.pending')}</option>
            <option value="overdue">{t('common.overdue')}</option>
          </select>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">{t('invoices.invoiceNumber')}</th>
                <th className="px-6 py-4">{t('invoices.billTo')}</th>
                <th className="px-6 py-4">{t('invoices.issueDate')}</th>
                <th className="px-6 py-4">{t('invoices.paymentDue')}</th>
                <th className="px-6 py-4">{t('common.amount')}</th>
                <th className="px-6 py-4">{t('common.status')}</th>
                <th className="px-6 py-4 text-right">{t('common.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group"
                >
                  <td className="px-6 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {inv.clientName}
                    </div>
                    <div className="text-[11px] text-slate-500">{inv.clientEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {inv.issueDate}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {inv.dueDate}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                    {inv.currency === 'USD'
                      ? `$${inv.total.toLocaleString()}`
                      : `${inv.total.toLocaleString()} so'm`}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {inv.status === 'paid' ? t('common.paid') : t('common.pending')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewInvoice(inv)}
                        title={t('invoices.previewInvoice')}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {inv.status === 'pending' && (
                        <button
                          onClick={() => markInvoicePaid(inv.id)}
                          title={t('invoices.markAsPaid')}
                          className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => deleteInvoice(inv.id)}
                        title={t('common.delete')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE INVOICE MODAL */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={t('invoices.createBtn')}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('invoices.billTo')} *
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium"
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
                {t('invoices.currencyTogglePrompt')}
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium"
              >
                <option value="USD">USD ($) - International</option>
                <option value="UZS">UZS (so'm) - O'zbekiston</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('invoices.paymentDue')}
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium"
              />
            </div>
          </div>

          {/* Line items section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('invoices.itemDescription')}
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {t('invoices.addItem')}
              </button>
            </div>

            <div className="space-y-2">
              {formData.items.map((item, idx) => {
                const lineTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0);

                return (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Design UI System components"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium"
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                      className="w-16 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium text-center"
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                      className="w-28 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium text-right"
                    />
                    <div className="w-24 text-right font-bold text-xs">
                      {lineTotal.toLocaleString()}
                    </div>
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tax and Subtotals */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>{t('invoices.subtotal')}:</span>
              <span>
                {formData.currency === 'USD' ? `$${formSubtotal.toLocaleString()}` : `${formSubtotal.toLocaleString()} so'm`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span>{t('invoices.taxRate')}:</span>
                <input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                  className="w-16 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-center text-xs"
                />
              </span>
              <span>
                {formData.currency === 'USD' ? `$${formTaxAmount.toLocaleString()}` : `${formTaxAmount.toLocaleString()} so'm`}
              </span>
            </div>

            <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>{t('common.total')}:</span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {formData.currency === 'USD' ? `$${formTotal.toLocaleString()}` : `${formTotal.toLocaleString()} so'm`}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('invoices.notes')}
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('invoices.notesPlaceholder')}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-medium"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25"
            >
              {t('common.save')}
            </button>
          </div>
        </form>
      </Modal>

      {/* PRINTABLE INVOICE PREVIEW MODAL */}
      <Modal
        isOpen={!!previewInvoice}
        onClose={() => setPreviewInvoice(null)}
        title={previewInvoice ? `${t('invoices.previewInvoice')}: ${previewInvoice.id}` : ''}
        maxWidth="max-w-4xl"
      >
        {previewInvoice && (
          <div>
            {/* Action Bar (Print / PDF) */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 no-print">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    previewInvoice.status === 'paid'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {previewInvoice.status === 'paid' ? t('common.paid') : t('common.pending')}
                </span>
                <span className="text-xs text-slate-400">
                  {previewInvoice.currency}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {previewInvoice.status === 'pending' && (
                  <button
                    onClick={() => {
                      markInvoicePaid(previewInvoice.id);
                      setPreviewInvoice({ ...previewInvoice, status: 'paid' });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow hover:bg-emerald-700 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('invoices.markAsPaid')}</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow hover:bg-indigo-700 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('common.print')}</span>
                </button>
              </div>
            </div>

            {/* Actual Printable Invoice Container */}
            <div
              id="printable-invoice"
              className="p-8 bg-white text-slate-900 rounded-xl border border-slate-200 shadow-sm space-y-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-black text-indigo-600 tracking-tight">
                    WorkSphere
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    {user?.company || 'Apex Creative Labs'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user?.taxId || 'STIR 308 945 120'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user?.email || 'billing@worksphere.app'}
                  </div>
                </div>

                <div className="text-right">
                  <h2 className="text-3xl font-black text-slate-800 tracking-wider">
                    INVOICE
                  </h2>
                  <div className="text-sm font-mono font-bold text-indigo-600 mt-1">
                    #{previewInvoice.id}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Date: {previewInvoice.issueDate}
                  </div>
                  <div className="text-xs text-rose-500 font-bold">
                    Due: {previewInvoice.dueDate}
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Billed To (Mijoz / Client)
                </span>
                <div className="font-bold text-sm text-slate-900">
                  {previewInvoice.clientName}
                </div>
                <div className="text-xs text-slate-600">{previewInvoice.clientEmail}</div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800 text-slate-700 font-bold uppercase">
                    <th className="py-2.5">Service Description</th>
                    <th className="py-2.5 text-center">Qty</th>
                    <th className="py-2.5 text-right">Unit Rate</th>
                    <th className="py-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {previewInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-medium text-slate-800">
                        {item.description}
                      </td>
                      <td className="py-3 text-center text-slate-600">{item.qty}</td>
                      <td className="py-3 text-right text-slate-600">
                        {previewInvoice.currency === 'USD'
                          ? `$${item.rate.toLocaleString()}`
                          : `${item.rate.toLocaleString()} so'm`}
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900">
                        {previewInvoice.currency === 'USD'
                          ? `$${item.amount.toLocaleString()}`
                          : `${item.amount.toLocaleString()} so'm`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Financial Calculation */}
              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>
                      {previewInvoice.currency === 'USD'
                        ? `$${previewInvoice.subtotal.toLocaleString()}`
                        : `${previewInvoice.subtotal.toLocaleString()} so'm`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax / VAT ({previewInvoice.taxRate}%):</span>
                    <span>
                      {previewInvoice.currency === 'USD'
                        ? `$${previewInvoice.taxAmount.toLocaleString()}`
                        : `${previewInvoice.taxAmount.toLocaleString()} so'm`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
                    <span>Total Amount:</span>
                    <span className="text-indigo-600">
                      {previewInvoice.currency === 'USD'
                        ? `$${previewInvoice.total.toLocaleString()}`
                        : `${previewInvoice.total.toLocaleString()} so'm`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank & Payment Notes */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Bank Rekvizitlari:</span>
                <p>{user?.bankDetails || "Ipak Yo'li Bank, MFO: 00444, H/R: 20208000900123456001"}</p>
                {previewInvoice.notes && (
                  <p className="italic text-slate-500 mt-2">"{previewInvoice.notes}"</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
