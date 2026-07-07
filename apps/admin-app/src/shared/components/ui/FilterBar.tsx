import { Search } from 'lucide-react';
interface FilterBarProps { search: string; onSearchChange: (v: string) => void; children?: React.ReactNode; }
export default function FilterBar({ search, onSearchChange, children }: FilterBarProps) {
  return <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center"><div className="relative flex-1 w-full"><Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" /><input type="text" value={search} onChange={e => onSearchChange(e.target.value)} placeholder="بحث..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50" /></div>{children}</div>;
}