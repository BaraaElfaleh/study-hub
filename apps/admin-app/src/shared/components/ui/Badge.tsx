export default function Badge({ children, variant }: { children: React.ReactNode; variant: 'success' | 'danger' | 'warning' }) {
  const c = { success: 'bg-green-400/10 text-green-400 border-green-400/20', danger: 'bg-red-400/10 text-red-400 border-red-400/20', warning: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' };
  return <span className={`px-2 py-0.5 rounded-full text-xs border ${c[variant]}`}>{children}</span>;
}