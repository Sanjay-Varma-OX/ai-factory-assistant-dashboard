import React from 'react';

const UserAvatar = ({ name, size = 'md', className = '' }) => {
  // Get initials from name
  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Generate a consistent color based on name
  const getColorClass = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    // Use name to generate a consistent index
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${getColorClass(name)} 
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-semibold
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
