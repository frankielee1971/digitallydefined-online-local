import * as React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

// DigitallyDefined Icon Component Library
// Consistent sizing and theming across all components

const ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
}

const ICON_WEIGHTS = {
  regular: 'font-normal',
  bold: 'font-bold',
}

const Icon = React.forwardRef(({ name, size = 'md', weight = 'regular', color, className, ...props }, ref) => {
  const IconComponent = Icons[name] || Icons.AlertCircle;
  const sizeClass = ICON_SIZES[size] || ICON_SIZES.md;
  const weightClass = ICON_WEIGHTS[weight] || ICON_WEIGHTS.regular;
  
  const iconStyle = color ? { color } : {};
  
  return (
    <IconComponent
      ref={ref}
      className={`${sizeClass} ${weightClass} ${className || ''}`}
      style={iconStyle}
      {...props}
    />
  )
})
Icon.displayName = 'Icon'

// Icon button variant
const IconButton = React.forwardRef(({ name, size = 'md', variant = 'ghost', className, ...props }, ref) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  const variantClasses = {
    ghost: 'hover:bg-foreground/10 rounded-full',
    solid: 'bg-orange text-white border border-orange',
    outline: 'border border-foreground rounded-full hover:bg-foreground/5',
  };
  
  return (
    <button
      ref={ref}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className || ''}`}
      {...props}
    >
      <Icon name={name} size="md" />
    </button>
  )
})
IconButton.displayName = 'IconButton'

// Export individual icon components as convenience wrappers
const createIconComponent = (name) => (props) => <Icon name={name} {...props} />;

export const IconAlert = createIconComponent('Alert');
export const IconCheck = createIconComponent('Check');
export const IconExternalLink = createIconComponent('ExternalLink');
export const IconPlus = createIconComponent('Plus');
export const IconMinus = createIconComponent('Minus');
export const IconX = createIconComponent('X');
export const IconMenu = createIconComponent('Menu');
export const IconHome = createIconComponent('Home');
export const IconSettings = createIconComponent('Settings');
export const IconUser = createIconComponent('User');
export const IconMail = createIconComponent('Mail');
export const IconCalendar = createIconComponent('Calendar');
export const IconChart = createIconComponent('Chart');
export const IconTarget = createIconComponent('Target');
export const IconMessageCircle = createIconComponent('MessageCircle');
export const IconUsers = createIconComponent('Users');
export const IconBuilding = createIconComponent('Building');
export const IconDollarSign = createIconComponent('DollarSign');
export const IconBook = createIconComponent('Book');
export const IconRocket = createIconComponent('Rocket');
export const IconShield = createIconComponent('Shield');
export const IconLock = createIconComponent('Lock');
export const IconKey = createIconComponent('Key');
export const IconSun = createIconComponent('Sun');
export const IconMoon = createIconComponent('Moon');
export const IconCode = createIconComponent('Code');
export const IconDatabase = createIconComponent('Database');
export const IconServer = createIconComponent('Server');
export const IconNetwork = createIconComponent('Network');
export const IconGit = createIconComponent('Git');
export const IconGithub = createIconComponent('Github');
export const IconEye = createIconComponent('Eye');
export const IconEyeOff = createIconComponent('EyeOff');
export const IconSearch = createIconComponent('Search');
export const IconFilter = createIconComponent('Filter');
export const IconSort = createIconComponent('Sort');
export const IconCopy = createIconComponent('Copy');
export const IconTrash = createIconComponent('Trash');
export const IconEdit = createIconComponent('Edit');
export const IconSave = createIconComponent('Save');
export const IconUpload = createIconComponent('Upload');
export const IconDownload = createIconComponent('Download');
export const IconRefresh = createIconComponent('Refresh');
export const IconShare = createIconComponent('Share');
export const IconHeart = createIconComponent('Heart');
export const IconStar = createIconComponent('Star');
export const IconBell = createIconComponent('Bell');
export const IconClock = createIconComponent('Clock');
export const IconInfo = createIconComponent('Info');
export const IconWarning = createIconComponent('Warning');
export const IconError = createIconComponent('Error');

export { Icon, IconButton };
