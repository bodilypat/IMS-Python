#app/services/audit_service.py

from sqlalchemy.orm import Session
from datetime import datetime
from app.models.audit import AuditLog

#------------------------------------------------
# Log audit event
#------------------------------------------------
def log_audit_event(
        db: Session, 
        user_id: int, 
        action: str, 
        description: str,
    ) -> AuditLog:
    """
    Logs an audit event to the database.
    Args:
        db (Session): Database session.
        user_id (int): ID of the user performing the action.
        action (str): The action performed.
        description (str): Description of the action.
    Returns:
        AuditLog: The created audit log entry.
    """
    audit_log = AuditLog(
        user_id=user_id,
        action=action,
        description=description,
        timestamp=datetime.utcnow()
    )
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)
    return audit_log

#------------------------------------------------
# Get audit logs
#------------------------------------------------
def get_audit_logs(
        db: Session,
        user_id: int | None = None,
        action: str | None = None,
        limit: int =100,
        
    ):
    """
    Retrieves audit logs from the database with optional filters.
    Args:
        db (Session): Database session.
        user_id (int | None): Filter by user ID.
        action (str | None): Filter by action.
        limit (int): Maximum number of logs to retrieve.
    Returns:
        List[AuditLog]: List of audit log entries.
    """
    query = db.query(AuditLog)
    if user_id is not None:
        query = query.filter(AuditLog.user_id == user_id)
    if action is not None:
        query = query.filter(AuditLog.action == action)
    audit_logs = query.order_by(AuditLog.timestamp.desc()).limit(limit).all()
    return audit_logs



    