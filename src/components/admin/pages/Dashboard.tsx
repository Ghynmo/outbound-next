import React from 'react';
import { useData } from '../../../context/DataContext';
import { getPackageImageSrc } from '../../../utils/imageHelper';
import SafeImage from '../../ui/SafeImage';
import { Package, Image, Users, Eye, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { packages, gallery } = useData();

  // Mock data for charts
  const visitorData = [
    { name: 'Mon', visits: 400 },
    { name: 'Tue', visits: 300 },
    { name: 'Wed', visits: 550 },
    { name: 'Thu', visits: 450 },
    { name: 'Fri', visits: 600 },
    { name: 'Sat', visits: 800 },
    { name: 'Sun', visits: 750 },
  ];

  const packageData = [
    { name: 'Edukasi', value: packages.filter(p => p.category === 'Edukasi').length },
    { name: 'Camping', value: packages.filter(p => p.category === 'Camping').length },
    { name: 'Gathering', value: packages.filter(p => p.category === 'Gathering').length },
  ];

  const COLORS = ['#1f4b43', '#e7c873', '#d97706'];

  const stats = [
    { 
      label: 'Total Paket', 
      value: packages.length, 
      icon: Package, 
      color: 'bg-primary/10 text-primary', 
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Galeri Foto', 
      value: gallery.length, 
      icon: Image, 
      color: 'bg-secondary/20 text-yellow-700',
      trend: '+5%',
      trendUp: true
    },
    { 
      label: 'Pengunjung', 
      value: '1.2k', 
      icon: Users, 
      color: 'bg-blue-100 text-blue-600',
      trend: '+18%',
      trendUp: true
    },
    { 
      label: 'Total Views', 
      value: '8.5k', 
      icon: Eye, 
      color: 'bg-orange-100 text-orange-600',
      trend: '-2%',
      trendUp: false
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Selamat datang kembali, Admin!</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {stat.trendUp ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                  <span>{stat.trend}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Statistik Pengunjung</h3>
            <select className="bg-gray-50 border-none text-sm rounded-lg px-3 py-1 text-gray-600 focus:ring-2 focus:ring-primary/20 cursor-pointer">
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1f4b43" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1f4b43" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#1f4b43', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="visits" stroke="#1f4b43" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Distribusi Paket</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={packageData} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fill: '#4b5563', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {packageData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Packages */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Paket Terbaru</h3>
            <button className="text-primary text-sm font-medium hover:underline flex items-center">
              Lihat Semua <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {packages.slice(0, 4).map((pkg) => (
              <div key={pkg.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <SafeImage 
                    src={getPackageImageSrc(pkg.image)} 
                    alt={pkg.title} 
                    className="rounded-lg object-cover shadow-sm group-hover:shadow transition-shadow" 
                    fill
                    sizes="48px"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">{pkg.title}</h4>
                  <p className="text-sm text-gray-500">{pkg.price}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${pkg.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {pkg.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Aktivitas Terakhir</h3>
          <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
            <div className="relative group">
              <div className="absolute -left-[29px] mt-1.5 w-3 h-3 rounded-full bg-primary border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div>
                <p className="text-gray-800 text-sm font-medium group-hover:text-primary transition-colors">Update konten "Tentang Kami"</p>
                <p className="text-xs text-gray-400 mt-1">2 jam yang lalu</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -left-[29px] mt-1.5 w-3 h-3 rounded-full bg-secondary border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div>
                <p className="text-gray-800 text-sm font-medium group-hover:text-primary transition-colors">Menambahkan foto baru ke Galeri</p>
                <p className="text-xs text-gray-400 mt-1">5 jam yang lalu</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -left-[29px] mt-1.5 w-3 h-3 rounded-full bg-orange-400 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div>
                <p className="text-gray-800 text-sm font-medium group-hover:text-primary transition-colors">Mengubah harga Paket Edu 1</p>
                <p className="text-xs text-gray-400 mt-1">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
