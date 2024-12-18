from fastapi import FastAPI
from contextlib import asynccontextmanager
from pydantic import BaseModel
import numpy as np
from stable_baselines3 import PPO
from gymnasium.envs.registration import register
import gymnasium as gym
from fastapi.middleware.cors import CORSMiddleware
import random
import google.generativeai as genai

register(
    id='SimpleCombatGame-v1',
    entry_point='AI.Combat.my_env.simple_combat:SimpleCombatEnv',
)

simpleEnv = gym.make('SimpleCombatGame-v1')
simpleModel = PPO.load("ppo_simple_combat_game_model.zip", env=simpleEnv)
print("Simple Combat AI Loaded");

@asynccontextmanager
async def lifespan(app: FastAPI):
    populate_riddle_pool()
    yield 

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class State(BaseModel):
    ai_hp: int
    player_hp: int
    total_distance: float
    x_distance: float
    remaining_time: int
    is_attacking: int
    knight_defending: int

@app.post("/predict_simple_action/")
async def predict_action(state: State):
    state_array = np.array([state.ai_hp, state.player_hp, state.total_distance,
                            state.x_distance, state.remaining_time, 
                            state.is_attacking, state.knight_defending], dtype=np.float32)
    
    action, _ = simpleModel.predict(state_array, deterministic=False)
    
    return {"action": int(action)}

riddle_pool = []

def generate_trivia():
    genai.configure(api_key="AIzaSyB0VfYJvPfVYSZWFxb37ZXno-ccDcXxpBY")

    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 70,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )

    chat_session = model.start_chat(
        history=[
        ]
    )

    response = chat_session.send_message("Generate One Trivia Question With Answer About Football. However make sure that answer is only one or two word long. Also For Question Don't Exceed Word Limit of 10 words. Ensure Formatting of Trivia as Question: What is XYZ and then Answer: ABC. Another thing is to not generate same Q/As")

    lines = response.text.split("\n")

    qa_dict = {}

    for line in lines:
        if line.startswith("Question:"):
            qa_dict["question"] = line.replace("Question:", "").strip()
        elif line.startswith("Answer:"):
            qa_dict["answer"] = line.replace("Answer:", "").strip()

    return qa_dict


def populate_riddle_pool(count=3, category="Capitals"):
    global riddle_pool
    riddle_pool = [generate_trivia() for _ in range(count)]
    print(f"Generated {len(riddle_pool)} riddles for category '{category}'")
    print(riddle_pool)

@app.get("/fetch_questions/")
async def fetch_questions():
    global riddle_pool

    if len(riddle_pool) < 3:
        populate_riddle_pool() 
  
    selected_riddles = random.sample(riddle_pool, 3)
    
    response = {
        "first": selected_riddles[0],
        "second": selected_riddles[1],
        "third": selected_riddles[2],
    }

    return response