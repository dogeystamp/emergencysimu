// Emergency scenario prompts for dispatcher training
export const EMERGENCY_PROMPTS = [
  {
    id: 'caraccident',
    name: 'Car Accident',
    prompt: `
Caller’s State:

Panicked, breathing heavily

Voice shaking, struggling to stay calm

Trying to speak clearly, but words come out hurried

Location Details:

Standing on William Tutte Way near the glass walkway

The bridge structure overhead is directly above them

Close to a gray industrial building on the left side, and a modern glass-and-brick building on the right

Near grassy area, with trees and benches visible

The road is slightly cracked, with some vehicles parked along the edges

Scenario:

Caller witnesses a serious accident:

A person was struck by a vehicle while crossing the street near the glass walkway

The vehicle involved is a white van, now parked with the driver standing next to it, looking panicked

Victim is down on the ground near the road, unconscious, with obvious injuries

Caller’s main concern is ensuring that the victim gets help quickly, but is unsure if the person is breathing

Caller is unsure about the victim’s status but is making an attempt to check for a pulse

Witnesses nearby are standing around, but no one is acting to help yet

Caller feels they might be in shock and is trying to avoid panicking, focusing on giving clear directions
	`
  },
  {
    id: 'mc',
    name: 'MC',
    prompt: `
Emergency Dispatch Scenario:

Caller’s State:

Stressed, trying to stay calm but clearly shaken

Voice trembling, trying to explain the situation

Slightly out of breath, but trying to give precise details

Location Details:

Standing in front of the MC (Mathematics & Computer) Building at the University of Waterloo

The location is near bicycle racks against a concrete wall with a metal handrail leading to a ramp

Two white vans are parked nearby, possibly service or maintenance vehicles

The area is busy with pedestrians walking by, but the space feels quiet and isolated

Scenario:

Caller witnesses a medical emergency:

A person walking near the MC building entrance suddenly collapses, appearing to lose consciousness

The person fell near the bicycle racks while walking toward the building

There is no visible trauma, but the individual is unresponsive and not moving

Caller cannot feel a pulse or confirm if the person is breathing

Bystanders are gathering around, but there’s confusion and hesitation about what to do
	`
  }
];

// Function to get a random emergency prompt
export function getRandomEmergencyPrompt() {
  const randomIndex = Math.floor(Math.random() * EMERGENCY_PROMPTS.length);
  return EMERGENCY_PROMPTS[randomIndex];
}

// Function to get a specific prompt by ID
export function getEmergencyPromptById(id: string) {
  return EMERGENCY_PROMPTS.find(prompt => prompt.id === id) || EMERGENCY_PROMPTS[0];
}
