// src/components/MyPage/UserProfileArea.jsx
import React, { useState } from "react";
import { updateMe, changePassword } from "../../services/accountService";
import zxcvbn from "zxcvbn";
import "./styles/UserProfileArea.css";

function UserProfileArea({ user, setUser, refreshUser }) {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        username: user.username,
        email: user.email,
        gender: user.gender === "none" ? "" : user.gender,
        age: user.age === null ? "" : user.age,
    });

    const [passwordForm, setPasswordForm] = useState({
        old_password: "",
        new_password: "",
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [passwordStrength, setPasswordStrength] = useState(null);
    const [loading, setLoading] = useState(false);

    // 年齢ラベル
    const getAgeLabel = (age) => {
        if (age === null || age === undefined || age === "") return "未設定";
        if (age >= 50) return "50代以上";
        return `${age}代`;
    };

    // 性別ラベル
    const getGenderLabel = (gender) => {
        if (!gender || gender === "none") return "未設定";
        return gender;
    };

    // 入力変更
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 新しいパスワード入力時に強度チェック
    const handleNewPasswordChange = (value) => {
        setPasswordForm({ ...passwordForm, new_password: value });

        const result = zxcvbn(value || "");
        setPasswordStrength(result.score); // 0〜4 の強度
    };

    // プロフィール更新
    const handleSave = async () => {
        setLoading(true);

        // ★ age="" → null、gender="" → "none" に変換
        const payload = {
            ...form,
            age: form.age === "" ? null : Number(form.age),
            gender: form.gender === "" ? "none" : form.gender,
        };

        try {
            const updated = await updateMe(payload );
            setUser(updated);
            refreshUser();
            setEditMode(false);
            alert("プロフィールを更新しました");
        } catch (err) {
            console.error(err);
            // Django のバリデーションエラーは err がオブジェクトで返る
            if (err && typeof err === "object" && !Array.isArray(err)) {
                const messages = Object.values(err).flat().join("\n");
                alert(messages);
            } else {
                alert("更新に失敗しました");
            }
        } finally {
            setLoading(false);
        }
    };

    // パスワード変更
    const handlePasswordChange = async () => {
        if (!passwordForm.old_password || !passwordForm.new_password) {
            alert("すべての項目を入力してください");
            return;
        }

        if (passwordStrength < 3) {
            alert("パスワードが弱すぎます。英大文字・数字・記号を含めてください。");
            return;
        }

        setLoading(true);
        try {
            await changePassword(passwordForm);
            alert("パスワードを変更しました");
            setPasswordForm({ old_password: "", new_password: "" });
            setPasswordStrength(null);
        } catch (err) {
            console.error(err);
            alert("パスワード変更に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // 強度メッセージ
    const strengthLabel = ["非常に弱い", "弱い", "普通", "強い", "非常に強い"];


    return (
        <div className="user-profile-area">
            <h3>プロフィール情報</h3>

            {/* 表示モード */}
            {!editMode && (
                <div>
                    <p><strong>ユーザー名：</strong> {user.username}</p>
                    <p><strong>メール：</strong> {user.email}</p>
                    <p><strong>性別：</strong> {getGenderLabel(user.gender)}</p>
                    <p><strong>年齢：</strong> {getAgeLabel(user.age)}</p>

                    <button className="btn-save" onClick={() => setEditMode(true)}>
                        編集する
                    </button>
                </div>
            )}

            {/* 編集モード */}
            {editMode && (
                <div>
                    <div className="form-row">
                        <label>ユーザー名：</label>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <label>メール：</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* 性別 */}
                    <div className="radio-group">
                        <label>性別：</label>
                        <div>
                            <label><input type="radio" name="gender" value="" checked={form.gender === ""} onChange={handleChange} /> 非公開</label>
                            <label><input type="radio" name="gender" value="男性" checked={form.gender === "男性"} onChange={handleChange} /> 男性</label>
                            <label><input type="radio" name="gender" value="女性" checked={form.gender === "女性"} onChange={handleChange} /> 女性</label>
                            <label><input type="radio" name="gender" value="その他" checked={form.gender === "その他"} onChange={handleChange} /> その他</label>
                        </div>
                    </div>

                    {/* 年齢 */}
                    <div className="radio-group">
                        <label>年齢：</label>
                        <div>
                            <label><input type="radio" name="age" value="" checked={form.age === ""} onChange={handleChange} /> 非公開</label>
                            <label><input type="radio" name="age" value="10" checked={form.age === 10 || form.age === "10"} onChange={handleChange} /> 10代</label>
                            <label><input type="radio" name="age" value="20" checked={form.age === 20 || form.age === "20"} onChange={handleChange} /> 20代</label>
                            <label><input type="radio" name="age" value="30" checked={form.age === 30 || form.age === "30"} onChange={handleChange} /> 30代</label>
                            <label><input type="radio" name="age" value="40" checked={form.age === 40 || form.age === "40"} onChange={handleChange} /> 40代</label>
                            <label><input type="radio" name="age" value="50" checked={form.age === 50 || form.age === "50"} onChange={handleChange} /> 50代以上</label>
                        </div>
                    </div>

                    <button className="btn-save" onClick={handleSave} disabled={loading}>
                        {loading ? "保存中..." : "保存"}
                    </button>

                    <button
                        className="btn-cancel"
                        onClick={() => {
                            setEditMode(false);
                            setForm({
                                username: user.username,
                                email: user.email,
                                gender: user.gender || "",
                                age: user.age || "",
                            });
                        }}
                    >
                        キャンセル
                    </button>
                </div>
            )}


            {/* パスワード変更 */}
            <h4>パスワード変更</h4>

            <div>
                <label>現在のパスワード：</label>
                <input
                    type={showOldPassword ? "text" : "password"}
                    name="old_password"
                    value={passwordForm.old_password}
                    onChange={(e) =>
                        setPasswordForm({
                            ...passwordForm,
                            old_password: e.target.value,
                        })
                    }
                />
                <button
                    type="button"
                    className="btn-toggle"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                >
                    {showOldPassword ? "非表示" : "表示"}
                </button>
            </div>

            <div>
                <label>新しいパスワード：</label>
                <input
                    type={showNewPassword ? "text" : "password"}
                    name="new_password"
                    value={passwordForm.new_password}
                    onChange={(e) => handleNewPasswordChange(e.target.value)}
                />
                <button
                    type="button"
                    className="btn-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                    {showNewPassword ? "非表示" : "表示"}
                </button>
            </div>

            {/* 強度表示 */}
            {passwordStrength !== null && (
                <p className="strength" style={{ color: passwordStrength < 3 ? "red" : "green" }}>
                    パスワード強度：{strengthLabel[passwordStrength]}
                </p>
            )}

            <button className="btn-password" onClick={handlePasswordChange} disabled={loading}>
                {loading ? "変更中..." : "パスワードを変更"}
            </button>
        </div>
    );
}

export default UserProfileArea;