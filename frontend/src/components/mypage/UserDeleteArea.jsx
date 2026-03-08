import React, { useState } from "react";
import { deleteMe } from "../../services/accountService";
import { logout } from "../../services/authService";
import "./styles/UserDeleteArea.css";


function UserDeleteArea({ user }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("本当にアカウントを削除しますか？\nこの操作は取り消せません。")) {
            return;
        }

        setLoading(true);

        try {
            await deleteMe();
            alert("アカウントを削除しました");

            // ログアウト処理
            logout();

            // ログインページへ遷移（必要に応じて変更）
            window.location.href = "/login";
        } catch (err) {
            console.error(err);
            alert("アカウント削除に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-delete-area">
            <h3>アカウント削除</h3>
            <p>※この操作は取り消せません。すべてのデータが削除されます。</p>

            <button
                onClick={handleDelete}
                disabled={loading}
                className="btn-delete"
            >
                {loading ? "削除中..." : "アカウントを削除する"}
            </button>
        </div>
    );
}

export default UserDeleteArea;