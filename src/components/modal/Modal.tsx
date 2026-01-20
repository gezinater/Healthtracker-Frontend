import "./modal.css";
import { useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

function Modal({ isOpen, onClose, children, title }: ModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        const originalOverflow = document.body.style.overflow;
        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
        
    }, [isOpen, onClose]);

    if (!isOpen) {
        return;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button type="button" onClick={onClose}>
                        X
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
