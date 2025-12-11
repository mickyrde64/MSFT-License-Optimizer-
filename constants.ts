import { LicensePlan } from './types';

export const PLANS: LicensePlan[] = [
  {
    id: 'm365-business-basic',
    name: 'Microsoft 365 Business Basic',
    shortName: 'Business Basic',
    description: 'Best for businesses that need easy remote solutions, with Microsoft Teams, secure cloud storage, and Office Online (web and mobile versions only).',
    price: '$6.00 user/mo',
    category: 'Business',
    popular: true,
    apps: ['Web & Mobile Apps Only'],
    services: ['Exchange Online (50GB)', 'OneDrive (1TB)', 'SharePoint', 'Teams', 'Exchange Online Protection'],
    security: ['Standard Security', 'MFA Enforced Defaults'],
    features: ['Max 300 Users', 'Commercial Use'],
  },
  {
    id: 'm365-business-standard',
    name: 'Microsoft 365 Business Standard',
    shortName: 'Business Standard',
    description: 'Best for businesses that need full remote work and collaboration tools, including Microsoft Teams, secure cloud storage, business email, and premium Office applications across devices.',
    price: '$12.50 user/mo',
    category: 'Business',
    popular: true,
    apps: ['Web & Mobile Apps', 'Desktop Apps (Word, Excel, PPT)', 'Publisher & Access (PC Only)'],
    services: ['Exchange Online (50GB)', 'OneDrive (1TB)', 'SharePoint', 'Teams', 'Microsoft Bookings'],
    security: ['Standard Security'],
    features: ['Max 300 Users', 'Commercial Use', 'Webinar Hosting'],
  },
  {
    id: 'm365-business-premium',
    name: 'Microsoft 365 Business Premium',
    shortName: 'Business Premium',
    description: 'Best for businesses that require secure, remote work solutions with everything included in Business Standard, plus advanced cyberthreat protection and device management.',
    price: '$22.00 user/mo',
    category: 'Business',
    popular: true,
    apps: ['Web & Mobile Apps', 'Desktop Apps (Word, Excel, PPT)', 'Publisher & Access (PC Only)'],
    services: ['Exchange Online (50GB)', 'OneDrive (1TB)', 'SharePoint', 'Teams', 'Exchange Online Archiving (1.5TB)'],
    security: ['Defender for Business', 'Intune (Device Management)', 'Entra ID P1 (Azure AD P1)', 'Azure Information Protection', 'Conditional Access'],
    features: ['Max 300 Users', 'Shared Computer Activation', 'Windows Virtual Desktop Rights'],
  },
  {
    id: 'o365-e3',
    name: 'Office 365 E3',
    shortName: 'Office 365 E3',
    description: 'Best for enterprises that need best-in-class productivity apps and core security and compliance capabilities for their organization.',
    price: '$23.00 user/mo',
    category: 'Enterprise',
    popular: false,
    apps: ['Web & Mobile Apps', 'Desktop Apps (Enterprise Version)', 'Publisher & Access (PC Only)', 'Multilingual User Interface'],
    services: ['Exchange Online (100GB)', 'OneDrive (1TB - 5TB)', 'SharePoint', 'Teams', 'Unlimited Archiving'],
    security: ['Basic DLP', 'Message Encryption'],
    features: ['Unlimited Users', 'Shared Computer Activation', 'Group Policy Support', 'Legal Hold'],
  },
  {
    id: 'm365-e3',
    name: 'Microsoft 365 E3',
    shortName: 'Microsoft 365 E3',
    description: 'Best for enterprises that need best-in-class productivity apps with advanced security and device management capabilities.',
    price: '$36.00 user/mo',
    category: 'Enterprise',
    popular: true,
    apps: ['Web & Mobile Apps', 'Desktop Apps (Enterprise Version)', 'Publisher & Access (PC Only)'],
    services: ['Exchange Online (100GB)', 'OneDrive (1TB - 5TB)', 'SharePoint', 'Teams', 'Unlimited Archiving'],
    security: ['Defender for Endpoint P1', 'Intune (Device Management)', 'Entra ID P1 (Azure AD P1)', 'Azure Information Protection P1', 'Advanced DLP'],
    features: ['Unlimited Users', 'Windows 11 Enterprise OS', 'Shared Computer Activation', 'Group Policy Support'],
  },
  {
    id: 'm365-e5',
    name: 'Microsoft 365 E5',
    shortName: 'Microsoft 365 E5',
    description: 'Best for enterprises that need the most advanced security, compliance, and analytical capabilities.',
    price: '$57.00 user/mo',
    category: 'Enterprise',
    popular: false,
    apps: ['Web & Mobile Apps', 'Desktop Apps (Enterprise Version)', 'Publisher & Access (PC Only)', 'Power BI Pro'],
    services: ['Exchange Online (100GB)', 'OneDrive (1TB - 5TB)', 'SharePoint', 'Teams', 'Teams Phone System', 'Audio Conferencing'],
    security: ['Defender for Endpoint P2', 'Defender for Office 365', 'Defender for Identity', 'Entra ID P2', 'Intune', 'Insider Risk Management'],
    features: ['Unlimited Users', 'Windows 11 Enterprise OS', 'Advanced eDiscovery', 'Auto-labeling policies'],
  },
];

export interface CalculatorItem {
  id: string;
  category: string;
  name: string;
  skuName: string;
  price: number;
  features: string[];
  limitations: string[];
}

export const CALCULATOR_ITEMS: CalculatorItem[] = [
  // Business Plans
  {
    id: 'm365-bus-basic',
    category: 'Business Plans (<300 Users)',
    name: 'Business Basic',
    skuName: 'Microsoft 365 Business Basic',
    price: 6.00,
    features: ['Web/Mobile Apps Only', 'Exchange (50GB)', 'Teams', 'OneDrive (1TB)'],
    limitations: ['No Desktop Apps', 'Max 300 users']
  },
  {
    id: 'm365-bus-std',
    category: 'Business Plans (<300 Users)',
    name: 'Business Standard',
    skuName: 'Microsoft 365 Business Standard',
    price: 12.50,
    features: ['Desktop Apps included', 'Exchange (50GB)', 'Teams', 'Webinar Hosting'],
    limitations: ['Max 300 users', 'Basic Security']
  },
  {
    id: 'm365-bus-prem',
    category: 'Business Plans (<300 Users)',
    name: 'Business Premium',
    skuName: 'Microsoft 365 Business Premium',
    price: 22.00,
    features: ['Desktop Apps', 'Intune (MDM)', 'Defender for Business', 'Azure AD P1'],
    limitations: ['Max 300 users', 'Best Value SKU']
  },

  // Enterprise Plans
  {
    id: 'o365-e1',
    category: 'Enterprise Plans (Unlimited)',
    name: 'Office 365 E1',
    skuName: 'Office 365 E1',
    price: 10.00,
    features: ['Web/Mobile Apps Only', 'Exchange (50GB)', 'Teams', 'SharePoint'],
    limitations: ['No Desktop Apps', 'No Advanced Security']
  },
  {
    id: 'o365-e3',
    category: 'Enterprise Plans (Unlimited)',
    name: 'Office 365 E3',
    skuName: 'Office 365 E3',
    price: 23.00,
    features: ['Desktop Apps (Enterprise)', 'Exchange (100GB)', 'Unlimited Archiving', 'DLP'],
    limitations: ['No Intune', 'No Azure AD P1']
  },
  {
    id: 'o365-e5',
    category: 'Enterprise Plans (Unlimited)',
    name: 'Office 365 E5',
    skuName: 'Office 365 E5',
    price: 38.00,
    features: ['Desktop Apps', 'Advanced Voice', 'Power BI Pro', 'Advanced Compliance'],
    limitations: ['Expensive']
  },
  {
    id: 'm365-e3',
    category: 'Enterprise Plans (Unlimited)',
    name: 'Microsoft 365 E3',
    skuName: 'Microsoft 365 E3',
    price: 36.00,
    features: ['Desktop Apps', 'Windows 11 Ent', 'Intune', 'Azure AD P1', 'Defender P1'],
    limitations: ['Costlier than O365 E3']
  },
  {
    id: 'm365-e5',
    category: 'Enterprise Plans (Unlimited)',
    name: 'Microsoft 365 E5',
    skuName: 'Microsoft 365 E5',
    price: 57.00,
    features: ['All Security Features', 'Defender XDR', 'Teams Phone', 'Power BI Pro'],
    limitations: ['Premium pricing']
  },
  
  // Frontline
  {
    id: 'm365-f3',
    category: 'Frontline Workers',
    name: 'Microsoft 365 F3',
    skuName: 'Microsoft 365 F3',
    price: 8.00,
    features: ['Web Apps', 'Teams', 'Intune', 'Windows 11 E3', '2GB Email'],
    limitations: ['No Desktop Apps', 'Small Mailbox']
  },

  // Standalone Services
  {
    id: 'exchange-p1',
    category: 'Standalone Services',
    name: 'Exchange Online P1',
    skuName: 'Exchange Online (Plan 1)',
    price: 4.00,
    features: ['50GB Mailbox', 'Calendar', 'Outlook Web Access'],
    limitations: ['No Office Apps']
  },
  {
    id: 'exchange-p2',
    category: 'Standalone Services',
    name: 'Exchange Online P2',
    skuName: 'Exchange Online (Plan 2)',
    price: 8.00,
    features: ['100GB Mailbox', 'Unlimited Archive', 'DLP'],
    limitations: ['No Office Apps']
  },
  {
    id: 'exchange-kiosk',
    category: 'Standalone Services',
    name: 'Exchange Kiosk',
    skuName: 'Exchange Online Kiosk',
    price: 2.00,
    features: ['2GB Mailbox', 'POP3/IMAP'],
    limitations: ['No Outlook Desktop', 'Mobile/Web only']
  },
  {
    id: 'onedrive-p1',
    category: 'Standalone Services',
    name: 'OneDrive P1',
    skuName: 'OneDrive for Business (Plan 1)',
    price: 5.00,
    features: ['1TB Storage', 'File Sharing'],
    limitations: []
  },
   {
    id: 'apps-business',
    category: 'Standalone Services',
    name: 'Apps for Business',
    skuName: 'Microsoft 365 Apps for Business',
    price: 8.25,
    features: ['Desktop Apps Only', '1TB OneDrive'],
    limitations: ['No Email (Exchange)', 'No Teams']
  },
];
