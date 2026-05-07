// FIFA World Cup 2026 Groups Data
import { getFlag } from './api';

export interface Team {
  name: string;
  flag: string;
  code: string;
}

export interface Group {
  name: string;
  teams: Team[];
}

export const WORLD_CUP_GROUPS: Group[] = [
  {
    name: 'Groupe A',
    teams: [
      { name: 'Mexico', flag: getFlag('mx'), code: 'mx' },
      { name: 'South Africa', flag: getFlag('za'), code: 'za' },
      { name: 'Korea Republic', flag: getFlag('kr'), code: 'kr' },
      { name: 'TBD (Playoff)', flag: '', code: '' },
    ],
  },
  {
    name: 'Groupe B',
    teams: [
      { name: 'Canada', flag: getFlag('ca'), code: 'ca' },
      { name: 'TBD (Playoff)', flag: '', code: '' },
      { name: 'Qatar', flag: getFlag('qa'), code: 'qa' },
      { name: 'Switzerland', flag: getFlag('ch'), code: 'ch' },
    ],
  },
  {
    name: 'Groupe C',
    teams: [
      { name: 'Brazil', flag: getFlag('br'), code: 'br' },
      { name: 'Morocco', flag: getFlag('ma'), code: 'ma' },
      { name: 'Haiti', flag: getFlag('ht'), code: 'ht' },
      { name: 'Scotland', flag: getFlag('gb-sct'), code: 'gb-sct' },
    ],
  },
  {
    name: 'Groupe D',
    teams: [
      { name: 'USA', flag: getFlag('us'), code: 'us' },
      { name: 'Paraguay', flag: getFlag('py'), code: 'py' },
      { name: 'Australia', flag: getFlag('au'), code: 'au' },
      { name: 'TBD (Playoff)', flag: '', code: '' },
    ],
  },
  {
    name: 'Groupe E',
    teams: [
      { name: 'Germany', flag: getFlag('de'), code: 'de' },
      { name: 'Curaçao', flag: getFlag('cw'), code: 'cw' },
      { name: "Côte d'Ivoire", flag: getFlag('ci'), code: 'ci' },
      { name: 'Ecuador', flag: getFlag('ec'), code: 'ec' },
    ],
  },
  {
    name: 'Groupe F',
    teams: [
      { name: 'Netherlands', flag: getFlag('nl'), code: 'nl' },
      { name: 'Japan', flag: getFlag('jp'), code: 'jp' },
      { name: 'TBD (Playoff)', flag: '', code: '' },
      { name: 'Tunisia', flag: getFlag('tn'), code: 'tn' },
    ],
  },
  {
    name: 'Groupe G',
    teams: [
      { name: 'Belgium', flag: getFlag('be'), code: 'be' },
      { name: 'Egypt', flag: getFlag('eg'), code: 'eg' },
      { name: 'IR Iran', flag: getFlag('ir'), code: 'ir' },
      { name: 'New Zealand', flag: getFlag('nz'), code: 'nz' },
    ],
  },
  {
    name: 'Groupe H',
    teams: [
      { name: 'Spain', flag: getFlag('es'), code: 'es' },
      { name: 'Cabo Verde', flag: getFlag('cv'), code: 'cv' },
      { name: 'Saudi Arabia', flag: getFlag('sa'), code: 'sa' },
      { name: 'Uruguay', flag: getFlag('uy'), code: 'uy' },
    ],
  },
  {
    name: 'Groupe I',
    teams: [
      { name: 'France', flag: getFlag('fr'), code: 'fr' },
      { name: 'Senegal', flag: getFlag('sn'), code: 'sn' },
      { name: 'TBD (Playoff)', flag: '', code: '' },
      { name: 'Norway', flag: getFlag('no'), code: 'no' },
    ],
  },
  {
    name: 'Groupe J',
    teams: [
      { name: 'Argentina', flag: getFlag('ar'), code: 'ar' },
      { name: 'Algeria', flag: getFlag('dz'), code: 'dz' },
      { name: 'Austria', flag: getFlag('at'), code: 'at' },
      { name: 'Jordan', flag: getFlag('jo'), code: 'jo' },
    ],
  },
  {
    name: 'Groupe K',
    teams: [
      { name: 'Portugal', flag: getFlag('pt'), code: 'pt' },
      { name: 'TBD (Playoff)', flag: '', code: '' },
      { name: 'Uzbekistan', flag: getFlag('uz'), code: 'uz' },
      { name: 'Colombia', flag: getFlag('co'), code: 'co' },
    ],
  },
  {
    name: 'Groupe L',
    teams: [
      { name: 'England', flag: getFlag('gb-eng'), code: 'gb-eng' },
      { name: 'Croatia', flag: getFlag('hr'), code: 'hr' },
      { name: 'Ghana', flag: getFlag('gh'), code: 'gh' },
      { name: 'Panama', flag: getFlag('pa'), code: 'pa' },
    ],
  },
];

// Teams for the spinner game
export const SPINNER_TEAMS = [
  { name: 'Mexico', color: '#006847', flag: getFlag('mx') },
  { name: 'Brazil', color: '#009B3A', flag: getFlag('br') },
  { name: 'Morocco', color: '#C1272D', flag: getFlag('ma') },
  { name: 'USA', color: '#3C3B6E', flag: getFlag('us') },
  { name: 'Germany', color: '#000000', flag: getFlag('de') },
  { name: 'France', color: '#002395', flag: getFlag('fr') },
  { name: 'Argentina', color: '#75AADB', flag: getFlag('ar') },
  { name: 'Spain', color: '#AA151B', flag: getFlag('es') },
  { name: 'England', color: '#CE1126', flag: getFlag('gb-eng') },
  { name: 'Portugal', color: '#FF0000', flag: getFlag('pt') },
  { name: 'Netherlands', color: '#F36C21', flag: getFlag('nl') },
  { name: 'Belgium', color: '#EF3340', flag: getFlag('be') },
  { name: 'Japan', color: '#BC002D', flag: getFlag('jp') },
  { name: 'Colombia', color: '#FCD116', flag: getFlag('co') },
  { name: 'Uruguay', color: '#5BA4D4', flag: getFlag('uy') },
  { name: 'Croatia', color: '#FF0000', flag: getFlag('hr') },
];
