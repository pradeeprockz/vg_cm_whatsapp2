import { INavData } from '@coreui/angular';
import { cilUserFollow } from '@coreui/icons';



export const navItemsVCCustomer: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Components',
    title: true,
  },
  {
    name: 'CMS Template',
    url: '/cms-template',
    iconComponent: { name: 'cilUserFollow' },
    children: [
      {
        name: 'CMS Template Report',
        url: '/cms-template/cms-template-report',
        iconComponent: { name: 'cil-bullhorn' },
      },
      {
        name: 'CMS Components Report',
        url: '/cms-template/cms-components-report',
        iconComponent: { name: 'cil-bullhorn' },
      },
      {
        name: 'CMS Temp Wa Comp Params Report',
        url: '/cms-template/cms-temp-wa-comp-params-report',
        iconComponent: { name: 'cil-bullhorn' },
      },
      {
        name: 'CMS Temp Wa Comp Header Params Report',
        url: '/cms-template/cms-temp-wa-comp-header-params-report',
        iconComponent: { name: 'cil-bullhorn' },
      },

    ]
  },
  {
    name: 'Messages',
    url: '/messages',
    iconComponent: { name: 'cilUserFollow' },
    children: [
      {
        name: 'Campaign',
        url: '/vc-campaign',
        iconComponent: { name: 'cil-bullhorn' },
      },
      
    ]
  },
  {
    name:'Settings',
    url:'/settings',
    iconComponent:{name:'cilUserFollow'},
    children:[
      {
        name:'Wa Block Report',
        url: './settings/wa-block-report',
        iconComponent:{name:'cilMoon'},
      },
      {
        name:'Greetflow Report',
        url: './settings/greetflow-report',
        iconComponent:{name:'cilMoon'},
      },
      {
        name: 'Pivot Table',
        url: './settings/pivot-table',
        iconComponent: { name: 'cilMoon' },
      },

    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    iconComponent: { name: 'cilUserFollow' },
    children: [
      {
        name: 'Message Summary Report',
        url: '/reports/msg-sum-report',
        iconComponent: { name: 'cilMoon' },
      },
      {
        name: 'Wa Camoaign Schedule Data Summ Report',
        url: '/reports/wa-campaign-schedule-data-summ-report',
        iconComponent: { name: 'cilMoon' },
      },
      {
        name: 'Wa Camoaign Data Summ Report',
        url: '/reports/wa-campaign-data-summ-report',
        iconComponent: { name: 'cilMoon' },
      },
      {
        name: 'Message Out Summary Report',
        url: '/reports/msg-out-summary-report',
        iconComponent: { name: 'cilMoon' },
      },
      {
        name: 'In Message Summary Report',
        url: '/reports/in-msg-summ-report',
        iconComponent: { name: 'cilMoon' },
      },
      {
        name: 'Out Status Summary Report',
        url: '/reports/out-status-summ-report',
        iconComponent: { name: 'cilMoon' },
      },
    ]
  },
 /* {
    name: 'PV Table Reports',
    url: '/pivot-table-reports',
    iconComponent: { name: 'cilUserFollow' },
    children: [
      {
        name: 'Message Summary PV Report',
        url: '/pivot-table-reports/msg-summ-report',
        iconComponent: { name: 'cilMoon' },
      },
      
    ]
  },*/
];



export const navItemsUser: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Components',
    title: true,
  },
 
];