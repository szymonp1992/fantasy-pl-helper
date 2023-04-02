from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import subprocess

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/fpl")
async def fpl_data() -> Dict[str, str]:
    cmd = "python3 fpl.py"
    output = subprocess.check_output(cmd, shell=True, text=True)
    return JSONResponse(content=output)

@app.get("/understat")
async def understat_data() -> Dict[str, str]:
    cmd = "python3 understat.py"
    output = subprocess.check_output(cmd, shell=True, text=True)
    return JSONResponse(content=output)
