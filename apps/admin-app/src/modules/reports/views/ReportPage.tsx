// apps/admin-app/src/modules/reports/views/ReportPage.tsx
import { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import { Loader } from '../../../shared/components/ui';
import { formatDate } from '../../../shared/utils';
import { TrendingUp, BookOpen, Users, ArrowUpDown } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

type Course = {
  title: string;
  enrollments: number;
};

type ActiveUser = {
  name: string;
  role: 'teacher' | 'student';
  lastActive: string;
};

const ReportPage = () => {
  const { chartData, topCourses, activeUsers, isLoading, error } = useReports();
  const [courseSorting, setCourseSorting] = useState<SortingState>([]);
  const [userSorting, setUserSorting] = useState<SortingState>([]);

  // تثبيت تعريفات الأعمدة حتى لا تتغير المراجع بين التصييرات
  const courseColumnHelper = useMemo(() => createColumnHelper<Course>(), []);
  const courseColumns = useMemo(
    () => [
      courseColumnHelper.accessor('title', {
        header: 'الكورس',
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      courseColumnHelper.accessor('enrollments', {
        header: 'عدد المسجلين',
        cell: (info) => (
          <span className="text-amber-400 font-bold">{info.getValue()}</span>
        ),
      }),
    ],
    [courseColumnHelper]
  );

  const userColumnHelper = useMemo(() => createColumnHelper<ActiveUser>(), []);
  const userColumns = useMemo(
    () => [
      userColumnHelper.accessor('name', {
        header: 'الاسم',
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      userColumnHelper.accessor('role', {
        header: 'الدور',
        cell: (info) => (
          <span className={info.getValue() === 'teacher' ? 'text-blue-400' : 'text-amber-400'}>
            {info.getValue() === 'teacher' ? 'معلم' : 'طالب'}
          </span>
        ),
      }),
      userColumnHelper.accessor('lastActive', {
        header: 'آخر نشاط',
        cell: (info) => formatDate(info.getValue()),
      }),
    ],
    [userColumnHelper]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const courseTable = useReactTable({
    data: topCourses,
    columns: courseColumns,
    state: { sorting: courseSorting },
    onSortingChange: setCourseSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const userTable = useReactTable({
    data: activeUsers,
    columns: userColumns,
    state: { sorting: userSorting },
    onSortingChange: setUserSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل التقارير</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">التقارير</h1>

      {/* رسم بياني للإيرادات */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-amber-400" />
          الإيرادات الشهرية
        </h2>
        <div className="flex items-end gap-2 h-48">
          {chartData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-400 font-mono">
                {(item.amount / 1000).toFixed(0)}k
              </span>
              <div
                className="w-full bg-linear-to-t from-amber-500 to-amber-400 rounded-t-md transition-all hover:from-amber-400 hover:to-amber-300"
                style={{ height: `${(item.amount / 20000) * 100}%` }}
              />
              <span className="text-xs text-slate-500 mt-1">
                {item.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* جدولان جنبًا إلى جنب مع فرز */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <BookOpen size={20} className="text-amber-400" />
            الكورسات الأعلى تسجيلاً
          </h2>
          <div className="rounded-xl border border-slate-700 overflow-hidden bg-slate-900">
            <table className="w-full text-right">
              <thead className="bg-slate-800 text-slate-300 text-sm">
                {courseTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3 font-medium">
                        {header.column.getCanSort() ? (
                          <button
                            className="flex items-center gap-1 hover:text-amber-400 transition"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <ArrowUpDown size={14} />
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-800">
                {courseTable.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 text-slate-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-amber-400" />
            المستخدمين الأكثر نشاطاً
          </h2>
          <div className="rounded-xl border border-slate-700 overflow-hidden bg-slate-900">
            <table className="w-full text-right">
              <thead className="bg-slate-800 text-slate-300 text-sm">
                {userTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-3 font-medium">
                        {header.column.getCanSort() ? (
                          <button
                            className="flex items-center gap-1 hover:text-amber-400 transition"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <ArrowUpDown size={14} />
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-800">
                {userTable.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 text-slate-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;