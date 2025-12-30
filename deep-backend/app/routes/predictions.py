from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime
import random
import json

from app.database import get_db
from app.models import User, Video, PredictionStatus
from app.schemas import PredictionResult, VideoResponse
from app.auth import get_current_user

router = APIRouter()

def dummy_deepfake_analysis(video_id: int, db: Session):
    """
    Dummy function to simulate deepfake detection
    In production, this would call your AI model
    """
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        return
    
    # Update status to processing
    video.status = PredictionStatus.PROCESSING
    db.commit()
    
    # Simulate processing time (remove in production)
    import time
    time.sleep(2)
    
    # Generate dummy results
    is_deepfake = random.choice([True, False])
    confidence = random.uniform(60, 99)
    
    # Dummy analysis details
    analysis_details = {
        "facial_consistency": random.uniform(0, 100),
        "audio_sync": random.uniform(0, 100),
        "artifacts_detected": random.choice([True, False]),
        "frame_analysis": {
            "total_frames": random.randint(500, 5000),
            "suspicious_frames": random.randint(0, 100)
        }
    }
    
    # Update video with results
    video.status = PredictionStatus.COMPLETED
    video.is_deepfake = is_deepfake
    video.confidence_score = confidence
    video.prediction_details = json.dumps(analysis_details)
    video.processed_at = datetime.utcnow()
    
    db.commit()

@router.post("/{video_id}/analyze", response_model=dict)
async def start_analysis(
    video_id: int,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Start deepfake analysis for a video"""
    video = db.query(Video).filter(
        Video.id == video_id,
        Video.user_id == current_user.id
    ).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    if video.status != PredictionStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Video is already {video.status}"
        )
    
    # Start analysis in background
    background_tasks.add_task(dummy_deepfake_analysis, video_id, db)
    
    return {
        "message": "Analysis started",
        "video_id": video_id,
        "status": "processing"
    }

@router.get("/{video_id}/result", response_model=PredictionResult)
async def get_prediction_result(
    video_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get prediction result for a video"""
    video = db.query(Video).filter(
        Video.id == video_id,
        Video.user_id == current_user.id
    ).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    if video.status != PredictionStatus.COMPLETED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Analysis not completed yet. Current status: {video.status}"
        )
    
    # Parse prediction details
    analysis_details = json.loads(video.prediction_details) if video.prediction_details else {}
    
    # Generate AI suggestions
    suggestions = []
    if video.is_deepfake:
        suggestions = [
            "⚠️ This video shows signs of manipulation",
            "🔍 Check the source and verify authenticity",
            "📊 Review the detailed analysis for specific anomalies",
            "🚨 Consider reporting if this is being used maliciously"
        ]
    else:
        suggestions = [
            "✅ No significant deepfake indicators detected",
            "💡 Always verify content from multiple sources",
            "📈 The video passed all authenticity checks",
            "✔️ High confidence in the authenticity of this media"
        ]
    
    return {
        "is_deepfake": video.is_deepfake,
        "confidence_score": video.confidence_score,
        "analysis_details": analysis_details,
        "suggestions": suggestions
    }

@router.get("/{video_id}/status")
async def get_analysis_status(
    video_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Check the status of video analysis"""
    video = db.query(Video).filter(
        Video.id == video_id,
        Video.user_id == current_user.id
    ).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    return {
        "video_id": video.id,
        "status": video.status,
        "uploaded_at": video.uploaded_at,
        "processed_at": video.processed_at
    }
