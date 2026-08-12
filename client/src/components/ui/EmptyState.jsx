const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center text-center py-20 px-6">
    {Icon && <Icon size={40} className="text-charcoal-700/40 mb-4" strokeWidth={1.25} />}
    <h3 className="font-display text-xl text-charcoal-900 mb-2">{title}</h3>
    {description && <p className="text-charcoal-700/70 max-w-sm mb-6">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
