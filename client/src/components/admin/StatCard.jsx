const StatCard = ({ icon: Icon, label, value, accent = 'text-leather-800' }) => (
  <div className="bg-white border border-charcoal-900/10 p-6 flex items-center gap-4 rounded">
    <div className={`w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center shrink-0 ${accent}`}>
      <Icon size={20} strokeWidth={1.5} />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-charcoal-700/60">{label}</p>
      <p className="font-display text-2xl text-charcoal-900">{value}</p>
    </div>
  </div>
);

export default StatCard;
