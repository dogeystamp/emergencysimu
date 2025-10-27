// Emergency scenario prompts for dispatcher training
export interface EmergencyPrompt {
  id: string;
  name: string;
  prompt: string;
  coordinates?: { lat: number; lng: number };
}

export const EMERGENCY_PROMPTS: EmergencyPrompt[] = [
  {
    id: 'caraccident',
    name: 'Car Accident',
    coordinates: { lat: 43.4723, lng: -80.5449 },
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
    coordinates: { lat: 43.4723, lng: -80.5449 },
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
  },
  {
    id: 'lake',
    name: 'Lake',
    coordinates: { lat: 43.4689, lng: -80.5370 },
    prompt: `
Caller’s State:

Calm but alert, trying to stay composed while assessing the situation

Voice clear, but tense with concern

Sound of footsteps or light wind in the background, indicating they are walking or standing

Location Details:

Caller is on the south side of Columbia Lake, walking along a lakeside path

Surrounded by lush greenery and trees, creating a peaceful, nature-filled environment

The path is narrow and winding, close to the water’s edge, with water on one side and thick vegetation on the other

It’s a quiet, serene location, with few people around; near picnic benches in an open area

Scenario:

Caller witnesses a water-related emergency:

A person has fallen into the lake or is struggling in the water nearby, possibly after slipping from the path or going too close to the edge

The individual is flailing and seems to be panicking in the water

Caller cannot reach the person, and the water is deep and cold, making it unsafe to intervene directly

Bystanders nearby are too far to help, and the caller is unsure if the person is in immediate danger of drowning, though they appear to be struggling
	`
  },
  {
    id: 'king',
    name: 'King Street',
    coordinates: { lat: 43.4643, lng: -80.5204 },
    prompt: `
Location: King Street, near GC Burger and Tut’s Egyptian Street Food, Downtown City

You are: Jason Turner, 34
Condition: Panicked, speaking quickly, difficult to understand at times

Incident Description:

Situation: You’re walking along King Street when you notice your friend, Anna, has suddenly collapsed near the entrance of GC Burger.

Symptoms: Anna is unresponsive and breathing very slowly. You suspect she may have overdosed on drugs because you found a small bag of white powder near her.

Scene: You’re standing by Anna’s side, trying to keep her awake by shaking her gently. There are a few pedestrians nearby, but they seem to be avoiding getting too close.

Location: Near the entrance of GC Burger, on the sidewalk, between the two restaurants.
	`
  },
  {
    id: 'Erb',
    name: 'Suspicious Person – Possible Armed Threat',
    coordinates: { lat: 43.4615, lng: -80.5234 },
    prompt: `
Location: Erb Street West, near Delirium, The Atrium, and Cobblestone Gallery, Downtown City
Time: 2:56 PM

You are: Kelly Patterson, 26
Condition: Nervous, trying to stay calm, whispering

Incident Description:

Situation: You’re walking down Erb Street West, just outside Delirium. You noticed a man standing near the entrance of The Atrium, acting strangely.

Description of Suspect: The man is wearing a dark hoodie, and his hands are hidden in his pockets. He seems to be watching people closely, pacing back and forth. He looks agitated and is occasionally mumbling to himself.

Suspicion: You’re concerned he might be carrying a weapon, as his behavior seems erratic, and his posture appears to be defensive. He has a bulge in the front of his jacket that could be a gun or another weapon.

Location: You are standing just outside Cobblestone Gallery, but you’re still a good distance away from the man. There are a few people walking by, but no one seems to be noticing the situation.
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
