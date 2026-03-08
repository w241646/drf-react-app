import React, { useState } from "react";
import { MEDIA_BASE_URL } from "../../config";
import api from "../../api";
import { ENDPOINTS } from "../../config";
import "./styles/UserIconArea.css";


function UserIconArea({ user, setUser }) {
    const [iconFile, setIconFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // デフォルト画像のパス
    const defaultIcon = MEDIA_BASE_URL + "user_icons/default-icon.png";

    // プレビュー表示
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setIconFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    // アイコン更新（アップロード）
    const handleUpload = async () => {
        if (!iconFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("icon", iconFile);

        try {
            const res = await api.patch(ENDPOINTS.ME, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUser(res.data);
            setPreview(null);
            setIconFile(null);
            alert("アイコンを更新しました");
        } catch (err) {
            console.error(err);
            alert("アイコン更新に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // アイコン削除
    const handleDelete = async () => {
        if (!window.confirm("本当にアイコンを削除しますか？")) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("icon", ""); // Django 側で削除処理

        try {
            const res = await api.patch(ENDPOINTS.ME, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUser(res.data);
            alert("アイコンを削除しました");
        } catch (err) {
            console.error(err);
            alert("削除に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    const hasIcon =
        user.icon &&
        user.icon.trim() !== "" &&
        !user.icon.includes("default-icon.png");

    const currentIcon = preview
        ? preview
        : hasIcon
        ? `${MEDIA_BASE_URL}${user.icon.replace(/^\/+/, "")}`
        : defaultIcon;

    const isDefault = !hasIcon;


    return (
        <div className="user-icon-area" style={{ marginBottom: "30px" }}>
            <h3>ユーザーアイコン</h3>

            <img
                src={currentIcon}
                alt="ユーザーアイコン"
                className="icon-image"
            />

            <div className="file-input">
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {preview && (
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="btn-save"
                >
                    {loading ? "更新中..." : "アイコンを保存"}
                </button>
            )}

            {!isDefault && (
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="btn-delete"
                >
                    アイコン削除
                </button>
            )}
        </div>
    );
}

export default UserIconArea;