export const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1 text-white/70 text-xs">
            {icon}
            <span >{label}</span>
        </div>
        <span className="text-white font-semibold">{value}</span>
    </div>
);