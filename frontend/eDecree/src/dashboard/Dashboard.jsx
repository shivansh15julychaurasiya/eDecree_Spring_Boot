import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      title: "Total Cases",
      value: "1,248",
      trend: "+12%",
      trendUp: true,
      progress: 82,
      icon: BriefcaseIcon,
      gradient: "from-primary-500 to-primary-700",
      lightBg: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      title: "Approved",
      value: "892",
      trend: "+8%",
      trendUp: true,
      progress: 71,
      icon: CheckCircleIcon,
      gradient: "from-success-500 to-success-700",
      lightBg: "bg-success-50",
      iconColor: "text-success-600",
    },
    {
      title: "Pending",
      value: "312",
      trend: "-3%",
      trendUp: false,
      progress: 65,
      icon: ClockIcon,
      gradient: "from-warning-500 to-warning-700",
      lightBg: "bg-warning-50",
      iconColor: "text-warning-600",
    },
    {
      title: "Rejected",
      value: "44",
      trend: "-15%",
      trendUp: false,
      progress: 45,
      icon: XCircleIcon,
      gradient: "from-danger-500 to-danger-700",
      lightBg: "bg-danger-50",
      iconColor: "text-danger-600",
    },
  ];

  const quickActions = [
    {
      title: "Search Decree",
      description: "Find decree records by case details",
      icon: MagnifyingGlassIcon,
      path: "/search/decree/case",
      color: "bg-primary-50 text-primary-700 hover:bg-primary-100",
      iconBg: "bg-primary-100",
    },
    {
      title: "Examine Decree",
      description: "Review and examine decree details",
      icon: ClipboardDocumentCheckIcon,
      path: "/examine/decree",
      color: "bg-success-50 text-success-700 hover:bg-success-100",
      iconBg: "bg-success-100",
    },
    {
      title: "Case Status",
      description: "Track status of decree cases",
      icon: ChartBarIcon,
      path: "/decree/case/status",
      color: "bg-info-50 text-info-700 hover:bg-info-100",
      iconBg: "bg-info-100",
    },
    {
      title: "Send SMS",
      description: "Send SMS notifications for decrees",
      icon: EnvelopeIcon,
      path: "/send/decree/sms",
      color: "bg-warning-50 text-warning-700 hover:bg-warning-100",
      iconBg: "bg-warning-100",
    },
  ];

  const caseBreakdown = [
    { label: "Civil", value: 520, total: 1248, color: "bg-primary-500" },
    { label: "Criminal", value: 380, total: 1248, color: "bg-danger-500" },
    { label: "Family", value: 248, total: 1248, color: "bg-success-500" },
    { label: "Others", value: 100, total: 1248, color: "bg-warning-500" },
  ];

  const recentDecrees = [
    {
      caseNo: "CWP-2024-1284",
      type: "Civil",
      date: "12 Jan 2025",
      status: "Approved",
      statusColor: "bg-success-100 text-success-700",
    },
    {
      caseNo: "CRL-2024-0892",
      type: "Criminal",
      date: "10 Jan 2025",
      status: "Pending",
      statusColor: "bg-warning-100 text-warning-700",
    },
    {
      caseNo: "FAO-2024-0456",
      type: "Family",
      date: "08 Jan 2025",
      status: "Approved",
      statusColor: "bg-success-100 text-success-700",
    },
    {
      caseNo: "CWP-2024-1102",
      type: "Civil",
      date: "05 Jan 2025",
      status: "Rejected",
      statusColor: "bg-danger-100 text-danger-700",
    },
    {
      caseNo: "CRL-2024-0765",
      type: "Criminal",
      date: "03 Jan 2025",
      status: "Pending",
      statusColor: "bg-warning-100 text-warning-700",
    },
  ];

  const activityTimeline = [
    {
      icon: ShieldCheckIcon,
      iconBg: "bg-success-100 text-success-600",
      title: "Decree Approved",
      desc: "Case CWP-2024-1284 has been approved",
      time: "2 hours ago",
    },
    {
      icon: PaperAirplaneIcon,
      iconBg: "bg-primary-100 text-primary-600",
      title: "SMS Sent",
      desc: "Notification sent for CRL-2024-0892",
      time: "4 hours ago",
    },
    {
      icon: DocumentTextIcon,
      iconBg: "bg-info-100 text-info-600",
      title: "New Case Filed",
      desc: "Case FAO-2024-0500 filed in system",
      time: "6 hours ago",
    },
    {
      icon: UserGroupIcon,
      iconBg: "bg-warning-100 text-warning-600",
      title: "Case Assigned",
      desc: "Case CWP-2024-1150 assigned to examiner",
      time: "8 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 md:p-8 text-white animate-fade-in">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.username || "User"}! 👋
              </h1>
              <p className="mt-1 text-primary-100 text-sm md:text-base">
                {today}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(user?.roles || []).map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium uppercase tracking-wide backdrop-blur-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 card-hover-lift animate-slide-up opacity-0 stagger-${index + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trendUp ? (
                      <ArrowTrendingUpIcon className="h-3.5 w-3.5 text-success-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-3.5 w-3.5 text-danger-500" />
                    )}
                    <span
                      className={stat.trendUp ? "text-success-600 font-medium" : "text-danger-600 font-medium"}
                    >
                      {stat.trend}
                    </span>
                    <span className="text-gray-400">vs last month</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl ${stat.lightBg}`}
                >
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stat.gradient}`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="animate-slide-up opacity-0 stagger-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className={`group relative flex flex-col items-start p-5 rounded-xl border border-gray-100 shadow-sm text-left transition-all duration-300 ${action.color} card-hover-lift`}
              >
                <div className={`p-3 rounded-lg ${action.iconBg} mb-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm">{action.title}</h3>
                <p className="text-xs opacity-80 mt-1 leading-relaxed">{action.description}</p>
                <ChevronRightIcon className="h-4 w-4 absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Status Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-slide-up opacity-0 stagger-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Case Status Breakdown</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Total: 1,248</span>
          </div>
          <div className="space-y-5">
            {caseBreakdown.map((item) => {
              const percent = ((item.value / item.total) * 100).toFixed(1);
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                      <span className="text-xs text-gray-500 ml-1">({percent}%)</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-slide-up opacity-0 stagger-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {activityTimeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-lg ${item.iconBg}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {index < activityTimeline.length - 1 && (
                      <div className="w-px h-full bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Decrees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up opacity-0 stagger-5">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Decrees</h2>
          <button
            onClick={() => navigate("/search/decree/case")}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            View All
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Case Number
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentDecrees.map((decree) => (
                <tr
                  key={decree.caseNo}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {decree.caseNo}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{decree.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{decree.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${decree.statusColor}`}
                    >
                      {decree.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate("/examine/decree")}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

