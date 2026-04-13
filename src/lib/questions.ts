import type { Section } from '@/types'

export type { Question, Section } from '@/types'

export const SECTIONS: Section[] = [
  {
    id: 'strategic-positioning',
    title: 'Strategic Positioning',
    intro: 'Define the intended role and direction of Saudi Bridge within the global ecosystem.',
    questions: [
      { key: 'sp_1', label: 'What is the intended role of Saudi Bridge at a global level?', helper: 'Think about positioning, differentiation, and the unique value this bridge creates internationally.' },
      { key: 'sp_2', label: 'How should Saudi Bridge be perceived internationally?', helper: 'Consider brand perception, reputation goals, and how stakeholders should describe it.' },
      { key: 'sp_3', label: 'Which types of founders are we prioritizing?', helper: 'Stage, sector, geography, background — be specific about the profile.' },
      { key: 'sp_4', label: 'Which sectors are strategic (AI, deep tech, etc.)?', helper: 'List sectors in order of priority and explain why each matters.' },
      { key: 'sp_5', label: 'What does success look like in 6–12 months?', helper: 'Define measurable outcomes — founder numbers, partnerships, visibility, deals.' },
    ],
  },
  {
    id: 'ecosystem-assessment',
    title: 'Current Ecosystem Assessment',
    intro: 'Map what exists today — initiatives, gaps, and what is working.',
    questions: [
      { key: 'ea_1', label: 'What initiatives currently exist under the ecosystem?', helper: 'List all active programs, platforms, or entities.' },
      { key: 'ea_2', label: 'What is the purpose of each initiative?', helper: 'For each initiative listed, describe its core mission and target audience.' },
      { key: 'ea_3', label: 'Where do these initiatives overlap?', helper: 'Identify duplication of effort, shared audiences, or competing narratives.' },
      { key: 'ea_4', label: 'Where are the current gaps?', helper: 'What is missing? Which founder needs go unmet? Which stages lack support?' },
      { key: 'ea_5', label: 'What is currently working well?', helper: 'Highlight strengths to preserve and build upon.' },
    ],
  },
  {
    id: 'pipeline-attract',
    title: 'Founder Pipeline — Attract',
    intro: 'Understand how founders first discover and engage with the ecosystem.',
    questions: [
      { key: 'pa_1', label: 'Where are founders currently coming from?', helper: 'Geographies, referrals, events, digital channels — be specific.' },
      { key: 'pa_2', label: 'Which geographies should we target?', helper: 'Prioritize regions and explain why they are strategically important.' },
      { key: 'pa_3', label: 'What channels are currently used to attract founders?', helper: 'Online, offline, partnerships, media, events, social.' },
    ],
  },
  {
    id: 'pipeline-select',
    title: 'Founder Pipeline — Select',
    intro: 'Define the selection criteria and process for choosing the right founders.',
    questions: [
      { key: 'ps_1', label: 'How are founders currently evaluated or selected?', helper: 'Process, tools, criteria, who is involved in the decision.' },
      { key: 'ps_2', label: 'What criteria define a high-quality founder for this ecosystem?', helper: 'Technical depth, market fit, ambition, cultural alignment — be explicit.' },
    ],
  },
  {
    id: 'pipeline-land',
    title: 'Founder Pipeline — Land',
    intro: 'Describe what happens when a founder is accepted and begins their journey.',
    questions: [
      { key: 'pl_1', label: 'What is the process for bringing founders into Saudi Arabia?', helper: 'Visa pathways, legal entities, timelines, coordination.' },
      { key: 'pl_2', label: 'What support is provided during entry?', helper: 'Housing, banking, legal setup, introductions, logistics.' },
    ],
  },
  {
    id: 'pipeline-integrate',
    title: 'Founder Pipeline — Integrate',
    intro: 'How are founders connected to the broader ecosystem once they arrive?',
    questions: [
      { key: 'pi_1', label: 'How are founders connected to existing programs and initiatives?', helper: 'Onboarding flow, touchpoints, introductions, timelines.' },
      { key: 'pi_2', label: 'What partnerships or entities are involved?', helper: 'Which organisations, investors, corporates, or government entities play a role?' },
    ],
  },
  {
    id: 'pipeline-scale',
    title: 'Founder Pipeline — Scale',
    intro: 'What resources and infrastructure exist to help founders grow significantly?',
    questions: [
      { key: 'psc_1', label: 'What resources are available to help founders grow?', helper: 'Capital, talent, infrastructure, market access, regulatory support.' },
      { key: 'psc_2', label: 'What is missing to support scaling companies?', helper: 'Identify the gaps that prevent companies from reaching the next stage.' },
    ],
  },
  {
    id: 'pipeline-amplify',
    title: 'Founder Pipeline — Amplify',
    intro: 'How are founder stories and ecosystem success communicated externally?',
    questions: [
      { key: 'pam_1', label: 'How are founder stories currently communicated?', helper: 'Formats, frequency, tone, who produces the content.' },
      { key: 'pam_2', label: 'Which platforms are used?', helper: 'LinkedIn, YouTube, podcasts, press, events — current and ideal.' },
    ],
  },
  {
    id: 'inflow-strategy',
    title: 'Founder Inflow Strategy',
    intro: 'Define the strategic approach to attracting international founders to the ecosystem.',
    questions: [
      { key: 'fi_1', label: 'Which founder profiles do we want to attract most?', helper: 'Sector, stage, nationality, background, ambition level.' },
      { key: 'fi_2', label: 'What is the value proposition for international founders?', helper: 'Why should a world-class founder choose this ecosystem?' },
      { key: 'fi_3', label: 'Why would a founder choose Saudi Arabia over other hubs?', helper: 'Unique advantages: capital, market, vision, speed, access.' },
      { key: 'fi_4', label: 'What partnerships (accelerators, VCs, institutions) are currently in place?', helper: 'List active partnerships and their current role in founder flow.' },
      { key: 'fi_5', label: 'Which partnerships should be developed?', helper: 'Gap partnerships — who do we need to engage to complete the pipeline?' },
    ],
  },
  {
    id: 'narrative-content',
    title: 'Narrative & Content',
    intro: 'Shape the story and content strategy that defines how the ecosystem is perceived globally.',
    questions: [
      { key: 'nc_1', label: 'What is the current narrative around these initiatives?', helper: 'How is the ecosystem currently described — internally and externally?' },
      { key: 'nc_2', label: 'What key messages should be communicated globally?', helper: 'The 3–5 things the world should understand about this ecosystem.' },
      { key: 'nc_3', label: 'What misconceptions need to be addressed?', helper: 'What false beliefs or hesitations do international founders or partners hold?' },
      { key: 'nc_4', label: 'What type of content is currently being produced?', helper: 'Format, frequency, quality, audience.' },
      { key: 'nc_5', label: 'What formats should be prioritized (interviews, discussions, etc.)?', helper: 'Based on audience preferences and strategic impact.' },
      { key: 'nc_6', label: 'Who are the key voices or speakers within the ecosystem?', helper: 'Internal leaders, founders, partners, or government figures.' },
      { key: 'nc_7', label: 'Which channels are currently used for distribution?', helper: 'Owned, earned, and paid channels — current state.' },
    ],
  },
  {
    id: 'distribution-reach',
    title: 'Distribution & Reach',
    intro: "Assess how widely the ecosystem's message is reaching its intended audiences.",
    questions: [
      { key: 'dr_1', label: 'What platforms are currently leveraged for visibility?', helper: 'Specific platforms, account sizes, engagement rates.' },
      { key: 'dr_2', label: 'What level of reach is currently achieved?', helper: 'Quantify if possible — impressions, followers, media mentions.' },
      { key: 'dr_3', label: 'Which global audiences are we targeting?', helper: 'Founders, investors, media, governments, corporates — be specific.' },
      { key: 'dr_4', label: 'How is engagement currently measured?', helper: 'KPIs, tools, reporting cadence, ownership.' },
      { key: 'dr_5', label: 'Where are the biggest distribution gaps?', helper: 'Audiences not reached, platforms not used, messages not landing.' },
    ],
  },
  {
    id: 'integration',
    title: 'Integration Across Initiatives',
    intro: 'Understand how the different parts of the ecosystem currently connect and where coordination breaks down.',
    questions: [
      { key: 'ia_1', label: 'How does Saudi Bridge currently connect with the AI Innovation Hub?', helper: 'Shared programs, referrals, joint events, shared teams.' },
      { key: 'ia_2', label: 'How does it connect with Youth initiatives?', helper: 'Pathways from youth programs into the main ecosystem.' },
      { key: 'ia_3', label: 'What is the intended founder journey across these initiatives?', helper: 'The ideal end-to-end flow from discovery to success.' },
      { key: 'ia_4', label: 'Where is coordination currently lacking?', helper: 'Disconnected handoffs, missing communication, siloed teams.' },
    ],
  },
  {
    id: 'monetization',
    title: 'Monetization & Sustainability',
    intro: 'Examine the financial model behind the ecosystem and its long-term viability.',
    questions: [
      { key: 'mo_1', label: 'What funding sources currently support the initiatives?', helper: 'Government grants, private investment, sponsorship, fees.' },
      { key: 'mo_2', label: 'Which parts of the ecosystem are funded vs unfunded?', helper: 'Map funding against each initiative or activity.' },
      { key: 'mo_3', label: 'Where is value being created today?', helper: 'Tangible outputs: companies, deals, jobs, content, relationships.' },
      { key: 'mo_4', label: 'What potential monetization layers exist (partnerships, programs, etc.)?', helper: 'Revenue models worth exploring — fees, licensing, co-investment.' },
      { key: 'mo_5', label: 'What should remain free vs structured?', helper: 'Which parts of the ecosystem are best as public goods vs premium services.' },
      { key: 'mo_6', label: 'What is the long-term sustainability model?', helper: 'The 3–5 year financial vision for the ecosystem.' },
    ],
  },
  {
    id: 'roles-ownership',
    title: 'Roles & Ownership',
    intro: 'Clarify who is responsible for what across the ecosystem — and where ownership is unclear.',
    questions: [
      { key: 'ro_1', label: 'Who currently owns each part of the ecosystem?', helper: 'Assign names or roles to each initiative and function.' },
      { key: 'ro_2', label: 'Who is responsible for founder acquisition?', helper: 'The team, process, and accountability chain.' },
      { key: 'ro_3', label: 'Who manages partnerships?', helper: 'Internal owner, external relationships, frequency of engagement.' },
      { key: 'ro_4', label: 'Who manages content and narrative?', helper: 'Team, agency, or individual — with what authority?' },
      { key: 'ro_5', label: 'Where are responsibilities unclear or overlapping?', helper: 'Be candid — where does accountability fall through the gaps?' },
    ],
  },
  {
    id: 'phase-1',
    title: 'Phase 1 Pilot',
    intro: 'Design the first 30–90 day pilot to validate and launch the strategy.',
    questions: [
      { key: 'ph_1', label: 'What would be the scope of an initial pilot (30–90 days)?', helper: 'Goals, activities, team, budget range.' },
      { key: 'ph_2', label: 'How many founders should be targeted initially?', helper: 'A realistic number that allows quality engagement.' },
      { key: 'ph_3', label: 'What activities should be prioritized first?', helper: 'Top 3–5 high-impact actions to start immediately.' },
      { key: 'ph_4', label: 'What outputs should be produced (content, partnerships, etc.)?', helper: 'Tangible deliverables from the pilot.' },
      { key: 'ph_5', label: 'What metrics define success in Phase 1?', helper: 'Quantifiable milestones to evaluate the pilot.' },
    ],
  },
  {
    id: 'internal-alignment',
    title: 'Internal Alignment',
    intro: 'Identify the internal prerequisites for moving forward confidently.',
    questions: [
      { key: 'al_1', label: 'What approvals are required to move forward?', helper: 'Stakeholder sign-offs, governance, legal clearances.' },
      { key: 'al_2', label: 'Who are the key decision-makers?', helper: 'Names, roles, and their level of current alignment.' },
      { key: 'al_3', label: 'What constraints should be considered (legal, operational, etc.)?', helper: 'Real constraints that will shape what is possible in Phase 1.' },
      { key: 'al_4', label: 'What internal resources can be allocated immediately?', helper: 'People, budget, tools, and time available now.' },
    ],
  },
  {
    id: 'final-reflection',
    title: 'Final Reflection',
    intro: 'Step back and articulate the highest possible vision for this ecosystem.',
    questions: [
      { key: 'fr_1', label: 'If this ecosystem is executed successfully, what would make it a reference point globally?', helper: 'Think boldly. What would make this the model that other countries study and replicate?' },
    ],
  },
]

export const TOTAL_QUESTIONS = SECTIONS.reduce((sum, s) => sum + s.questions.length, 0)
