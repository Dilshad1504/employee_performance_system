import { useState } from 'react';
import axios from 'axios';
import { UserPlus, Briefcase, Star, Award, ChevronRight, Check } from 'lucide-react';

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await axios.post('/api/employees', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStatus({ type: 'success', message: 'Employee added successfully!' });
      setFormData({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to add employee' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animation-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
          <UserPlus className="text-indigo-200" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Add New Employee</h1>
          <p className="text-gray-400 mt-1">Register a new team member to the performance matrix.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -mr-[250px] -mt-[250px] pointer-events-none"></div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 border backdrop-blur-md ${
            status.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {status.type === 'success' ? <Check size={20} className="mt-0.5" /> : <div className="mt-0.5 font-bold">!</div>}
            <p>{status.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Alex Johnson"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Briefcase size={14} className="text-gray-400" /> Department
            </label>
            <select
              required
              className="input-field appearance-none"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="" disabled>Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Award size={14} className="text-gray-400" /> Skills
            </label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="React, Node.js, Python (comma separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Star size={14} className="text-gray-400" /> Performance Score (0-100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              required
              className="input-field"
              placeholder="85"
              value={formData.performanceScore}
              onChange={(e) => setFormData({ ...formData, performanceScore: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Award size={14} className="text-gray-400" /> Experience (Years)
            </label>
            <input
              type="number"
              min="0"
              required
              className="input-field"
              placeholder="3"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end relative z-10">
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            {loading ? 'Registering...' : 'Register Employee'}
            {!loading && <ChevronRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistrationForm;
