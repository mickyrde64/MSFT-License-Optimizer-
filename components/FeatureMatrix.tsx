import React, { useMemo, useState } from 'react';
import { Check, Minus, Plus, Filter, X, Columns } from 'lucide-react';

const CSV_RAW = `12/11/2025,Office 365,,,Microsoft 365 Frontline,,,,,Microsoft 365 Enterprise,,,,Microsoft 365 Education,,,,,
Feature,E1,E3,E5,F1,F3,F5 Security,F5 Compliance,F5 Sec+Comp,E3,E5 Security,E5 Compliance,E5,A1 (Legacy),A1 for Devices,A3,A5 Security,A5 Compliance,A5
Office 365,E1,E3,E5,,F3,,,,E3,,,E5,A1,A1+,A3,,,A5
Activity Reports,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Adoption Score,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Alert Policies,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Audit (premium),,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Audit (standard),✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Basic Mobility & Security,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Bookings,✔,✔,✔,✔,✔,,,,✔,,,✔,,,✔,,,✔
Communication Compliance,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Compliance Manager,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Conditional Access for Sites,,,✔,,,,,,,,✔,✔,,,,,✔,✔
Content Search,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Copilot Studio for Teams,✔,✔,✔,,✔,,,,✔,,,✔,,,✔,,,✔
Customer Key,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Customer Lockbox,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Data Lifecycle Management,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Data Loss Prevention,,✔,✔,,,,✔,✔,✔,,,✔,✔,✔,✔,,,✔
Dataverse for Teams,✔,✔,✔,,✔,,,,✔,,,✔,,,✔,,,✔
Defender for Office 365 Plan 2,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Attack Simulation Training,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Automated Investigation & Response,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Campaign Views,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Compromised User Detection,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Teams Message Entity Panel,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Teams Message Quarantine,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Threat Explorer,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Threat Trackers,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Defender for Office 365 Plan 1,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > > Advanced Anti-Phishing,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > > Real-Time Reports,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > > Safe Attachments,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > > Safe Links,,,✔,,,✔,,✔,,✔,,✔,,,,✔,,✔
Double Key Encryption,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
eDiscovery (premium),,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
eDiscovery (standard),,✔,✔,,,,✔,✔,✔,,,✔,,,✔,,,✔
Education Insights,,,,,,,,,,,,,✔,✔,✔,,,✔
Exact Data Match,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Exchange Online,Plan 1(50 GB),Plan 2(100 GB),Plan 2(100 GB),Calendaronly,Kiosk(2 GB),,,,Plan 2(100 GB),,,Plan 2(100 GB),Plan 1+(50 GB),Plan 1+(50 GB),Plan 2(100 GB),,,Plan 2(100 GB)
Exchange Online Archiving,50 GB,1.5 TB,1.5 TB,,,,1.5 TB,1.5 TB,1.5 TB,,,1.5 TB,1.5 TB,1.5 TB,1.5 TB,,,1.5 TB
Exchange Online Protection,✔,✔,✔,,✔,✔,,✔,✔,✔,,✔,✔,✔,✔,✔,,✔
Graph Connector Capacity,✔,✔,✔,✔,✔,,,,✔,,,✔,,,✔,,,✔
InfoPath App,,✔,✔,,,,,,✔,,,✔,,,,,,
Information Barriers,,,✔,,,,✔,✔,,,✔,✔,✔,✔,✔,,,✔
Information Protection for M365,,✔,✔,FromEMS E3,FromEMS E3,,✔,✔,✔,,,✔,✔,✔,✔,,,✔
Message Encryption (advanced),,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Message Encryption (basic),,✔,✔,FromEMS E3,FromEMS E3,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft 365 Apps,,Enterprise,Enterprise,,,,,,Enterprise,,,Enterprise,,Education,Education,,,Education
Microsoft 365 Copilot Chat,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft 365 Mobile App,✔,✔,✔,Readonly,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft Forms,✔,✔,✔,Consumeonly,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft Lists,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft Places (core),✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft Search,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft Teams,Optional,Optional,Optional,Optional,Optional,,,,Optional,,,Optional,Education,Education,Education,,,Education
Microsoft To Do,✔,✔,✔,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft Whiteboard,✔,✔,✔,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Office 365 Cloud App Security,,,✔,,,,,,,,,✔,,,✔,,,✔
Office for the Web,✔,✔,✔,Readonly,✔,,,,✔,,,✔,✔,✔,✔,,,✔
OneDrive for Business,Plan 1(1 TB),Plan 2(1 TB+),Plan 2(1 TB+),Kiosk(2 GB),Kiosk(2 GB),,,,Plan 2(1 TB+),,,Plan 2(1 TB+),Plan 1(100 GB),Plan 1(100 GB),Plan 2(1 TB+),,,Plan 2(1 TB+)
OneNote Class Notebook,,,,,,,,,,,,,✔,✔,✔,,,✔
Planner for Office 365,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
PLC Groups,,,,,,,,,,,,,✔,✔,✔,,,✔
Power Apps for Office 365,✔,✔,✔,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Power Automate for Office 365,✔,✔,✔,,"2,000steps/day",,,,✔,,,✔,✔,✔,✔,,,✔
Power BI Pro,,,✔,,,,,,,,,✔,,,,,,✔
Privileged Access Management,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Productivity Server CAL,✔,✔,✔,,,,,,✔,,,✔,,,✔,,,✔
Project & Roadmap View Access,✔,✔,✔,,✔,,,,✔,,,✔,,,,,,
Records Management,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Retention Labels,,✔,✔,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Retention Policies,,✔,✔,,,,✔,✔,✔,,,✔,✔,✔,✔,,,✔
Rules-Based Classification (Office 365),,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
School Data Sync,,,,,,,,,,,,,✔,✔,✔,,,✔
Secure Score,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
SharePoint Online,Plan 1,Plan 2,Plan 2,Kiosk,Kiosk,,,,Plan 2,,,Plan 2,Plan 1+,Plan 1+,Plan 2,,,Plan 2
Skype for Business Plus CAL,,,✔,,,,,,,,,✔,,,,,,✔
Stream for Office 365,✔,✔,✔,Consumeonly,Consumeonly,,,,✔,,,✔,✔,✔,✔,,,✔
Sway,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Teams Audio Conferencing (full),,,✔,,,,,,,,,✔,,,,,,✔
Teams Data Loss Prevention,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Teams DLP & Export Graph API,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Teams Live Events,✔,✔,✔,,,,,,✔,,,✔,,,✔,,,✔
Teams Phone,,,✔,,,,,,,,,✔,,,,,,✔
Teams Town Halls,✔,✔,✔,,,,,,✔,,,✔,,,✔,,,✔
Teams Webinars,,✔,✔,,,,,,✔,,,✔,,,✔,,,✔
Visio for the Web,✔,✔,✔,Readonly,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Viva Connections,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Viva Engage,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Viva Insights - Personal,Basic,Basic,Premium,,,,,,Basic,,,Premium,,,Basic,,,Premium
Viva Learning (basic),✔,✔,✔,✔,✔,,,,✔,,,✔,,,,,,
3x Premium & Custom Compliance Templates,,,✔,,,,✔,✔,,,✔,✔,,,,,✔,✔
Enterprise Mobility + Security,,,,E3,E3,,,,E3,,,E5,,,A3,,,A5
Active Directory RMS,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
Advanced Threat Analytics (retiring),,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
App Governance,,,,,,✔,✔,✔,,✔,✔,✔,,,,✔,✔,✔
Azure RMS,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
Config Manager Endpoint Protection,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
Defender for Cloud Apps,,,,,,✔,✔,✔,,✔,✔,✔,,,,✔,✔,✔
Defender for Identity,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
Entra ID Plan 2,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Access Reviews,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Entitlement Management (basic),,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Entra ID Protection,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > MFA Registration Policy,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Privileged Identity Management,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Risk-Based Conditional Access,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Entra ID Plan 1,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Administrative Units,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > App Proxy, including PingAccess,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Cloud App Discovery,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Conditional Access,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Custom Security Attributes,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Entra ID Connect Health,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > External ID,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Microsoft Identity Manager,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Password Protection,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Self-Service Group Management,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Service Level Agreement,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Shared Account Password Roll-Over,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > SMS Sign-In,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Tenant Restrictions,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Terms of Use,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > 3rd Party MFA Integration,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > > Entra ID for Education,,,,,,,,,,,,,✔,✔,✔,,,✔
 > > > Advanced Security Reports & Alerts,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > Dynamic Groups,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > Enterprise State Roaming,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > Self-Service Password Reset in AD,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > Windows Autopilot,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > Entra ID for Office 365,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > Customized Sign-In Page,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > Self-Service Activity Reports,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > Entra ID Free,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > > Basic Security & Usage Reports,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > > Multi-Factor Auth (MFA),✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > > Passwordless Authentication,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > > Single-Sign-On to other SaaS,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > > Temporary Access Pass,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > > > > Verified ID,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Information Protection,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
Intune Plan 1,,,,✔,✔,,,,✔,,,✔,Education,Education,Education,,,Education
 > Application Management,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > Config Manager,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
 > Device Management,,,,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > Endpoint Analytics,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
Rules-Based Classification (Client & Scanner),,,,,,,✔,✔,,,✔,✔,,,,,✔,✔
Windows Server CAL Rights,,,,✔,✔,,,,✔,,,✔,,,✔,,,✔
Windows,,,,,F3,,,,E3,,,E5,Pro upgrade,Pro upgrade,A3,,,A5
Always On VPN,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Application Control,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
AppLocker,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
App Assure,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Assigned Access,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Attack Surface Reduction,,,,,✔,,,,✔,,,✔,,,✔,,,✔
BitLocker,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
BitLocker to Go,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
BranchCache,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Copilot in Windows,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Custom Logon,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Custom Shell,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Credential Guard,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Defender Antivirus,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Defender for Endpoint Plan 2,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Advanced Hunting,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Automated Investigations,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Defender for Cloud Apps Integration,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Endpoint Attack Notifications (suspended),,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Endpoint Detection & Response,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Evaluation Lab,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Threat Analytics,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > 6-Months Searchable Data,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Defender Vulnerability Management (core),,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > > Configuration Assessment,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Continuous Monitoring,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Device Discovery,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Device Inventory,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Remediation Tracking,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Risk Based Prioritization,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Software Inventory,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Software Usage Insights,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Vulnerability Assessment,,,,,,✔,,✔,,✔,,✔,,,,,,
 > Defender for Endpoint Plan 1,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Attack Surface Reduction (enhanced),,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Block at First Sight,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Centralized Management,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Cross-Platform Support,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Manual Response Actions,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Mobile Threat Defence,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Next Gen Protection,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Tamper Protection,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
 > > Web Content Filtering,,,,,,✔,,✔,✔,✔,,✔,,,✔,✔,,✔
Device Guard,,,,,✔,,,,✔,,,✔,,,✔,,,✔
DirectAccess (deprecated),,,,,✔,,,,✔,,,✔,,,✔,,,✔
Domain Join,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Edge for Business,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Entra ID Join,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Keyboard Filter,,,,,✔,,,,✔,,,✔,,,✔,,,✔
LAPS,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Long Term Servicing Channel,,,,,--,,,,✔,,,✔,,,✔,,,✔
Manage by MDM,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
MDOP (retiring),,,,,--,,,,✔,,,✔,,,✔,,,✔
Persistent Memory,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Power Automate Attended Desktop Flows,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Resilient File System (ReFS),,,,,✔,,,,✔,,,✔,,,✔,,,✔
SMB Direct,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Unbranded Boot,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Unified Write Filter,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Universal Print,,,,,✔,,,,✔,,,✔,~,~,✔,,,✔
Windows Autopatch,,,,,✔,,,,✔,,,✔,,,✔,,,✔
Windows Conditional Access,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Windows Firewall,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Windows Hello for Business,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Windows Update for Business,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Windows Virtualization Rights,,,,,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Windows 11 Support Period,,,,,36 months,,,,36 months,,,36 months,24 months,24 months,36 months,,,36 months
Suite Value,,,,,,,,,,,,,,,,,,
Clipchamp Standard,,,,,,,,,✔,,,✔,,,,,,
Defender for IoT - eIoT (5 devices),,,,,,,,,,✔,,✔,,,,,,
Endpoint DLP,,,,,,,✔,✔,,,✔,✔,,,,,✔,✔
FastTrack,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,,✔,✔,✔,✔,✔
Insider Risk Management,,,,,,,✔,✔,,,✔,✔,,,,,✔,✔
Loop Workspaces,,,,,,,,,✔,,,✔,,,✔,,,✔
Minecraft Education Edition,,,,,,,,,,,,,,✔,✔,,,✔
Office Professional Plus,,,,,,,,,✔,,,✔,,,,,,
Office Servers,,,,,,,,,✔,,,✔,,,✔,,,✔
Remote Help,,,,,,,,,,,,,✔,✔,✔,,,✔
Safe Documents,,,,,,,,,,✔,,✔,,,,✔,,✔
Sentinel Benefit,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
Student Use Benefits,,,,,,,,,,,,,,,✔,✔,,✔
Trainable Classifiers,,,,,,,✔,✔,,,✔,✔,,,,,✔,✔
Related Services,,,,,,,,,,,,,,,,,,
Security & Compliance,,,,,,,,,,,,,,,,,,
10-Year Audit Log Retention,,,+,,,,,,,,+,+,,,,,+,+
AccountGuard,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Advanced Data Residency,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Azure Automation,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Azure Backup,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Azure Bastion,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Azure Log Analytics,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Azure RBAC,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Azure Update Manager,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Compliance Premium Assessments,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Cross-Tenant Migration,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Defender CSPM,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Defender EASM,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Defender for Business,,,,,,,,,,,,,,,,,,
Defender for Business Servers,,,,,,,,,,,,,,,,,,
Defender for Cloud,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Defender for Servers,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Defender Threat Intelligence,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Defender Threat Intelligence API,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Defender Vulnerability Management (premium),,,,,,+,,+,,+,,+,,,,+,,+
 > Authenticated Scan For Windows,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Block Vulnerable Applications,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Browser Extensions Assessment,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Digital Certificate Assessment,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Hardware & Firmware Assessment,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Network Share Analysis,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Security Baselines Assessment,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Defender Vulnerability Management (core),,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > > Configuration Assessment,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Continuous Monitoring,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Device Discovery,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Device Inventory,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Remediation Tracking,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Risk Based Prioritization,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Software Inventory,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Software Usage Insights,,,,,,✔,,✔,,✔,,✔,,,,,,
 > > Vulnerability Assessment,,,,,,✔,,✔,,✔,,✔,,,,,,
Insider Risk Management Forensic Evidence,,,,,,,,,,,+,+,,,,,,
Intune Suite,,,,+,+,,,,+,,,+,,,+,,,+
 > Enterprise App Management,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Advanced Analytics,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Cloud PKI,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Endpoint Privilege Management,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Remote Help,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Intune Plan 2,,,,+,+,,,,+,,,+,,,+,,,+
 > > Firmware Over-the-Air Updates,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Specialty Device Management,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Tunnel for MAM,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
Microsoft 365 Archive,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft 365 Backup,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft 365 E5 Compliance,,,,,,,✔,✔,+,,✔,✔,,,+,,✔,✔
Microsoft 365 E5 Security,,,,,,✔,,✔,+,✔,,✔,,,+,✔,,✔
Microsoft 365 Lighthouse,,,,,,,,,+,,,+,,,,,,
Microsoft Sentinel,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft Tunnel,,,,+,+,,,,+,,,+,+,+,+,,,+
Multi-Geo,+,+,+,+,+,,,,+,,,+,,,,,,
Security Copilot,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
SharePoint Advanced Management Plan 1,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Restricted Site Creation,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > SharePoint Advanced Management for Copilot,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Advanced Tenant Rename,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > AI Insights,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Block Download Policy,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Conditional Access for Sites,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Data Access Governance Reports,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Data Access Governance Reports PowerShell,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Enterprise App Insight Reports,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Inactive Sites Policy,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Recent Site Actions,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Restricted Access Control for OneDrive,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Restricted Access Control for SharePoint,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Restricted Content Discovery,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Site Access Review,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Site Change History Reports,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Site Ownership Policy,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
Microsoft Entra,,,,,,,,,,,,,,,,,,
Entra Domain Services,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Entra External ID,Δ,Δ,Δ,✔,✔,Δ,Δ,Δ,✔,Δ,Δ,✔,Δ,Δ,✔,Δ,Δ,✔
Entra ID,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔,✔
Entra Suite add-on to Entra ID Plan 1,,,,+,+,,,,+,,,,,,+,,,
 > Entra ID Protection,,,,,,✔,,✔,,✔,,✔,,,,✔,,✔
 > Entra Suite add-on to Entra ID Plan 2,,,,,,+,,+,,+,,+,,,,+,,+
 > > Entra Internet Access,,,,+,+,,,,+,,,+,,,+,,,+
 > > Entra Private Access,,,,+,+,,,,+,,,+,,,+,,,+
 > > Entra ID Governance,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
 > > > Entitlement Management (premium),⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > > Identity Governance Dashboard,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > > Lifecycle Workflows,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > > ML Assisted Access Reviews,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Entra Verified ID Premium,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
 > > > Face Check,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
Entra Permissions Management (retiring),,,,,,,,,,,,,,,,,,
Entra Verified ID,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Entra Workload ID Premium,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
 > Access Reviews,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Entra ID Protection,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Risk-Based Conditional Access,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Entra Workload ID Free,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
 > > Basic Security & Usage Reports,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Identity Federation,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
Microsoft Priva,,,,,,,,,,,,,,,,,,
Privacy Risk Management,+,+,+,,,,,,+,,,+,+,+,+,,,+
Subject Rights Requests,+,+,+,,,,,,+,,,+,+,+,+,,,+
Microsoft Purview,,,,,,,,,,,,,,,,,,
Data Catalog,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Data Estate Insights,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Data Map,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Data Policy,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft Security Experts,,,,,,,,,,,,,,,,,,
Defender Experts for Hunting,,,,,,+,,+,,+,,+,,,,+,,+
Defender Experts for XDR,,,,,,+,,+,,+,,+,,,,+,,+
Communications,,,,,,,,,,,,,,,,,,
Azure Comm. Services,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Calling Plans,,,+,,,,,,,,,+,,,,,,+
Comms. Credits,,,+,,,,,,,,,+,,,,,,+
Digital Contact Centre,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
EHR Connector for Teams,+,+,+,+,+,,,,+,,,+,,,,,,
Teams Audio Conferencing (free add-on),Δ,Δ,✔,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,✔,Δ,Δ,Δ,Δ,Δ,✔
Teams Enterprise,+,+,+,+,+,,,,+,,,+,,,,,,
Teams Essentials,,,,,,,,,,,,,,,,,,
Teams Operator Connect,,,+,,,,,,,,,+,,,,,,+
Teams Phone Mobile,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Teams Premium,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Advanced Collaboration Tools,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Advanced Meetings,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Advanced Meetings Protection,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Advanced Town Halls,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Advanced Virtual Appointments,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Advanced Webinars,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Immersive Mesh Experiences,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Intelligent Recap,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Live Caption Translation,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Microsoft eCDN,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Microsoft Places (enhanced),⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > PowerPoint Live Chapters,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Queues App,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
Teams Rooms,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Extra Capacity,,,,,,,,,,,,,,,,,,
AI Builder Capacity,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Dataverse Storage,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
SharePoint Storage,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Universal Print Jobs,,,,,+,,,,+,,,+,+,+,+,,,+
Support Services,,,,,,,,,,,,,,,,,,
ProDirect Support for Azure,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
ProDirect Support for Dynamics 365,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
ProDirect Support for Microsoft 365,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Unified Support,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Education,,,,,,,,,,,,,,,,,,
Azure Dev Tools for Teaching,,,,,,,,,,,,,+,+,+,,,+
Class Notebook,,,,,,,,,,,,,,,+,,,+
Employee Experience,,,,,,,,,,,,,,,,,,
LinkedIn Learning,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Viva Suite,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Copilot in Viva Learning (preview),⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Skills in Viva (preview),⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Viva Learning (premium),+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Viva Workplace Analytics & Employee Feedback,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > > Copilot in Viva Glint,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Viva Glint,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > > Viva Insights - Manager, Leader, Analyst,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > > Viva Pulse,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > Viva Employee Communications & Communities,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > > Copilot in Viva Amplify,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Copilot in Viva Engage,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Answers in Viva,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > People in Viva,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Viva Amplify,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Viva Connections (50 instances),⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
 > > Viva Engage (premium),⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡,⊡
Power Platform,,,,,,,,,,,,,,,,,,
AI Builder,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Copilot Studio,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft Dataverse,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Power Apps,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Power Automate,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Power Automate Process Mining,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Power BI Premium,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Power Pages,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Companion Products & Services,,,,,,,,,,,,,,,,,,
App Assure,,,,+,+,,,,+,,,+,,,+,,,+
Azure Virtual Desktop,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Clipchamp Standard,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,✔,Δ,Δ,✔,Δ,Δ,Δ,Δ,Δ,Δ
Drive Shipping for PST import,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Dynamics 365 Customer Voice,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft Industry Clouds,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Microsoft 365 Dev Program,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Planner & Project,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
SharePoint Embedded,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Visio Online,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Windows 365 Business,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ
Windows 365 Enterprise,,,,,+,,,,+,,,+,,,+,,,+
Windows 365 Frontline,,,,,+,,,,+,,,+,,,+,,,+
Workplace Discount Program,,,,,,,,,+,,,+,,,+,,,+
Automation & Intelligence,,,,,,,,,,,,,,,,,,
Document Processing for Microsoft 365,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Microsoft 365 Copilot,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
 > Copilot Actions,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot Chat (Work),⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot Dashboard,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Excel,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Forms,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Loop,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in OneDrive,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in OneNote,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Outlook,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in PowerPoint,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Planner,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in SharePoint,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Stream,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Teams,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Whiteboard,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot in Word,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Copilot Prompt Gallery,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Graph and Connector Access Included,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Intelligent Recap,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Intelligent Search,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Microsoft 365 Agents,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Microsoft Places (additional),⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > SharePoint Agents,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Viva Insights - Manager, Leader, Analyst,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Viva Pulse for Copilot,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > SharePoint Advanced Management for Copilot,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Advanced Tenant Rename,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > AI Insights,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Block Download Policy,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Conditional Access for Sites,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Data Access Governance Reports,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Data Access Governance Reports PowerShell,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Enterprise App Insight Reports,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Inactive Sites Policy,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Recent Site Actions,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Restricted Access Control for OneDrive,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Restricted Access Control for SharePoint,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Restricted Content Discovery,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Site Access Review,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Site Change History Reports,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > > Site Ownership Policy,⊡,⊡,⊡,⊡,⊡,,,,⊡,,,⊡,⊡,⊡,⊡,,,⊡
 > Microsoft 365 Copilot Chat,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Chat (Web),✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Chat in Excel,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Chat in OneNote,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Chat in Outlook,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Chat in PowerPoint,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Chat in Word,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Code Interpreter,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot File Upload,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Image Generator,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Copilot Pages,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Create Agents,✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Graph Access in Agents (metered),✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
 > > Graph Connectors in Agents (metered),✔,✔,✔,✔,✔,,,,✔,,,✔,✔,✔,✔,,,✔
Microsoft 365 Copilot for Sales,+,+,+,+,+,,,,+,,,+,+,+,+,,,+
Microsoft 365 Unattended RPA,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ,Δ`;

interface ColumnDef {
  index: number;
  name: string;
  group: string;
  id: string;
}

interface MatrixRow {
  feature: string;
  level: number;
  values: { [colId: string]: string };
  isHeader: boolean;
}

export const FeatureMatrix: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse Headers and Column Definitions
  const { columns, rows, groups } = useMemo(() => {
    const lines = CSV_RAW.split('\n');
    
    // Line 0: Super Headers (Groups)
    // Line 1: Column Headers (SKUs)
    const groupLine = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const headerLine = lines[1].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const cols: ColumnDef[] = [];
    const grps: string[] = [];
    let currentGroup = 'Other';

    // Parse columns (starting from index 1, index 0 is 'Feature')
    for (let i = 1; i < headerLine.length; i++) {
        // Update current group if defined in groupLine (often spans multiple cols)
        if (groupLine[i] && groupLine[i].trim()) {
            currentGroup = groupLine[i].trim().replace(/^"|"$/g, '');
        }
        if (!grps.includes(currentGroup)) grps.push(currentGroup);
        
        const name = headerLine[i] ? headerLine[i].trim().replace(/^"|"$/g, '') : '';
        if (name) {
            cols.push({
                index: i,
                name,
                group: currentGroup,
                id: `${currentGroup}-${name}-${i}`
            });
        }
    }

    const dataRows: MatrixRow[] = [];
    
    for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.trim().replace(/^"|"$/g, ''));
        
        const featureRaw = parts[0] || "";
        let level = 0;
        let cleanFeature = featureRaw;
        
        if (featureRaw.includes('>')) {
            const matches = featureRaw.match(/>/g);
            level = matches ? matches.length : 0;
            cleanFeature = featureRaw.replace(/[>]/g, '').trim();
        }

        // Identify section headers by checking if all value columns are empty or strictly matching known section titles
        // Often section headers in this CSV have the same name as a group or are mostly empty.
        // A heuristic: if it matches a known group name or if the row is mostly empty/just titles
        // Actually, the previous logic was: parts.slice(1).every(p => !p)
        // Let's stick to checking if it looks like a section header (no checkmarks/data)
        const isHeader = parts.slice(1).every(p => !p) || 
                         grps.includes(cleanFeature) || 
                         cleanFeature === "Windows" || 
                         cleanFeature === "Enterprise Mobility + Security" ||
                         cleanFeature === "Office 365"; // Explicitly catch these common sections

        const values: { [colId: string]: string } = {};
        cols.forEach(col => {
            values[col.id] = parts[col.index] || '';
        });

        dataRows.push({
            feature: cleanFeature,
            level,
            values,
            isHeader
        });
    }

    return { columns: cols, rows: dataRows, groups: grps };
  }, []);

  // Default selection: Standard Enterprise SKUs
  // We'll initialize visible columns if not set
  const [visibleColIds, setVisibleColIds] = useState<string[]>(() => {
    // Default to O365 E3, O365 E5, M365 E3, M365 E5
    // We need to find their IDs.
    return columns.filter(c => 
        (c.group === 'Office 365' && (c.name === 'E3' || c.name === 'E5')) ||
        (c.group === 'Microsoft 365 Enterprise' && (c.name === 'E3' || c.name === 'E5'))
    ).map(c => c.id);
  });

  const toggleColumn = (id: string) => {
    setVisibleColIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleGroup = (group: string, select: boolean) => {
      const groupColIds = columns.filter(c => c.group === group).map(c => c.id);
      if (select) {
          setVisibleColIds(prev => Array.from(new Set([...prev, ...groupColIds])));
      } else {
          setVisibleColIds(prev => prev.filter(id => !groupColIds.includes(id)));
      }
  };

  const renderCell = (value: string) => {
    if (value === '✔') return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === '+') return <Plus className="w-4 h-4 text-blue-500 mx-auto" />;
    if (value === 'Δ') return <span className="text-slate-400 font-serif text-lg">Δ</span>;
    if (value === '⊡') return <div className="w-3 h-3 border border-slate-300 mx-auto bg-slate-50"></div>;
    if (!value) return <Minus className="w-4 h-4 text-slate-100 mx-auto" />;
    return <span className="text-[10px] leading-tight font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded inline-block max-w-full truncate" title={value}>{value}</span>;
  };

  const visibleColumns = useMemo(() => columns.filter(c => visibleColIds.includes(c.id)), [columns, visibleColIds]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[900px]">
      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Detailed Feature Matrix</h2>
            <p className="text-slate-500 text-sm">Comprehensive breakdown of entitlements across all plans.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border ${isFilterOpen ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
            >
                <Filter className="w-4 h-4" />
                Select Plans ({visibleColIds.length})
            </button>
        </div>
      </div>

      {/* Filter Panel (Collapsible) */}
      {isFilterOpen && (
          <div className="bg-slate-50 border-b border-slate-200 p-6 animate-in slide-in-from-top-2 duration-200 shadow-inner overflow-y-auto max-h-[300px]">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Available Plans</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {groups.map(group => (
                      <div key={group}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-800 text-sm truncate pr-2" title={group}>{group}</h4>
                            <div className="flex gap-1">
                                <button onClick={() => toggleGroup(group, true)} className="text-[10px] text-blue-600 hover:underline">All</button>
                                <span className="text-slate-300 text-[10px]">|</span>
                                <button onClick={() => toggleGroup(group, false)} className="text-[10px] text-slate-500 hover:underline">None</button>
                            </div>
                          </div>
                          <div className="space-y-2">
                              {columns.filter(c => c.group === group).map(col => (
                                  <label key={col.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1.5 rounded-md transition-colors">
                                      <input 
                                        type="checkbox" 
                                        checked={visibleColIds.includes(col.id)} 
                                        onChange={() => toggleColumn(col.id)}
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                      />
                                      <span className="text-sm text-slate-600">{col.name}</span>
                                  </label>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
      
      {/* Table Area */}
      <div className="overflow-auto flex-1 custom-scrollbar relative">
        <table className="w-full text-sm text-left border-collapse min-w-max">
          <thead className="sticky top-0 z-20 shadow-sm">
            <tr className="bg-white border-b border-slate-200">
              <th className="p-3 min-w-[300px] sticky left-0 bg-white z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-slate-400 font-medium text-xs uppercase tracking-wider pl-6">Feature</th>
              {visibleColumns.map(col => (
                  <th key={col.id} className="p-3 text-center min-w-[100px] bg-slate-50/90 backdrop-blur-sm border-l border-slate-100">
                    <div className="font-bold text-slate-800 text-xs">{col.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal truncate max-w-[100px] mx-auto" title={col.group}>{col.group}</div>
                  </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => {
               if (row.isHeader) {
                 return (
                    <tr key={idx} className="bg-slate-100/90 sticky top-[53px] z-10">
                        <td colSpan={visibleColumns.length + 1} className="py-2.5 px-6 text-xs font-bold text-slate-700 uppercase tracking-wider border-y border-slate-200">
                            {row.feature}
                        </td>
                    </tr>
                 )
               }

               return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-2 pr-4 sticky left-0 bg-white group-hover:bg-slate-50/80 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-transparent">
                        <div 
                            className="truncate pl-4 text-slate-700 font-medium text-xs flex items-center"
                            style={{ paddingLeft: `${(row.level * 16) + 16}px` }}
                            title={row.feature}
                        >
                            {row.level > 0 && <span className="w-1 h-1 rounded-full bg-slate-300 mr-2 shrink-0"></span>}
                            {row.feature}
                        </div>
                    </td>
                    {visibleColumns.map(col => (
                        <td key={col.id} className="p-2 text-center border-l border-slate-50">
                            {renderCell(row.values[col.id])}
                        </td>
                    ))}
                  </tr>
               )
            })}
            {rows.length === 0 && (
                <tr>
                    <td colSpan={visibleColumns.length + 1} className="p-8 text-center text-slate-500">
                        No features found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="bg-slate-50 p-4 text-xs border-t border-slate-200 shrink-0 flex flex-wrap gap-6 justify-center text-slate-500">
         <div className="flex items-center gap-1"><Check className="w-3 h-3 text-green-500" /> Included</div>
         <div className="flex items-center gap-1"><Plus className="w-3 h-3 text-blue-500" /> Add-on</div>
         <div className="flex items-center gap-1"><span className="font-serif">Δ</span> Azure/Usage</div>
         <div className="flex items-center gap-1"><span className="text-[10px] bg-slate-200 px-1 rounded">Text</span> Specific Entitlement</div>
         <span className="ml-auto text-[10px] text-slate-400"></span>
      </div>
    </div>
  );
};
