import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Briefcase, Star, Clock, UserCircle, MoreVertical } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!departmentFilter) {
      fetchEmployees();
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/employees/search?department=${departmentFilter}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animation-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Employee Directory</h1>
          <p className="text-gray-400 mt-1">Manage and monitor team performance metrics.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input-field pl-10 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="input-field pl-10 appearance-none w-full sm:w-48"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <button onClick={handleSearch} className="btn-secondary px-4 flex items-center justify-center">
              Apply
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div key={employee._id} className="glass-panel group hover:border-indigo-500/30 transition-all duration-300">
              <div className="p-6 border-b border-white/5 relative">
                <button className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xl font-bold text-white">
                      {employee.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{employee.name}</h3>
                    <p className="text-sm text-gray-400">{employee.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><Briefcase size={16}/> Department</span>
                  <span className="font-medium text-white bg-white/5 px-3 py-1 rounded-full">{employee.department}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><Clock size={16}/> Experience</span>
                  <span className="font-medium text-white">{employee.experience} Years</span>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400 flex items-center gap-2"><Star size={16}/> Performance Score</span>
                    <span className={`font-bold ${employee.performanceScore >= 85 ? 'text-emerald-400' : employee.performanceScore >= 70 ? 'text-blue-400' : 'text-amber-400'}`}>
                      {employee.performanceScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-[#0f172a] rounded-full h-2 overflow-hidden border border-white/5">
                    <div 
                      className={`h-2 rounded-full ${
                        employee.performanceScore >= 85 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 
                        employee.performanceScore >= 70 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 
                        'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                      }`}
                      style={{ width: `${employee.performanceScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 mt-2 border-t border-white/5">
                  <p className="text-xs text-gray-500 mb-2">KEY SKILLS</p>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-200 rounded-md border border-indigo-500/20">
                        {skill}
                      </span>
                    ))}
                    {employee.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded-md">
                        +{employee.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredEmployees.length === 0 && (
            <div className="col-span-full glass-panel p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <UserCircle size={32} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No employees found</h3>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
