// Sport facts from the UWW International Grappling Rules (May 2025), via strategy §1.6.

export const weightClasses = {
  men: [58, 62, 66, 71, 77, 84, 92, 100, 130],
  women: [53, 58, 64, 71, 90],
  u20WomenExtra: 49,
}

export const ageCategories = [
  // Age bands confirmed against UWW International Grappling Rules (May 2025), Art. 7
  { name: 'U13', ages: '12–13' },
  { name: 'U15', ages: '14–15' },
  { name: 'U17', ages: '16–17' },
  { name: 'U20', ages: '18–20' },
  { name: 'Seniors', ages: '20+' },
  { name: 'Veterans A–E', ages: '35–60' },
]

export const styles = [
  {
    id: 'nogi',
    name: 'Grappling',
    alias: 'No-Gi',
    kit: 'Rashguard and shorts',
    summary:
      'Athletes compete in a rashguard and shorts. Grips are taken on the body and limbs, so scrambles are fast and positions change quickly.',
  },
  {
    id: 'gi',
    name: 'Grappling Gi',
    alias: 'Gi',
    kit: 'Kimono (Gi)',
    summary:
      'Athletes wear a kimono that can be gripped. Collar and sleeve grips make the game more methodical and give full-coverage competition wear.',
  },
]

export const disciplines = [
  'Submission grappling',
  'Submission wrestling',
  'Brazilian Jiu-Jitsu',
  'Luta livre',
  'Catch wrestling',
  'Lancashire wrestling',
  'Shoot wrestling',
  'Combat wrestling',
]

export const mat = { diameter: 9, passivity: 1, protection: 1.5 }

export const keyStats = [
  { value: 2007, label: 'UWW introduced grappling among its regulated wrestling styles', format: 'year' },
  { value: 14, label: 'Senior weight categories across men’s and women’s divisions' },
  { value: 6, label: 'Nations at the 2024 Asian Grappling Championships, including Pakistan' },
  { value: 222, label: 'Competitors at the 2024 Asian Championships in Tagaytay' },
]
