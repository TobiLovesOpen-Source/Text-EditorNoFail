#[tauri::command]
async fn save_file(content: String) -> Result<(), String> {
    let home_dir = dirs::document_dir().ok_or("Konnte Dokumente-Ordner nicht finden")?;
    let file_path = home_dir.join("textscribe_notiz.md");
    std::fs::write(file_path, content).map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_file])
        .run(tauri::generate_context!())
        .expect("Fehler beim Starten der Tauri-Anwendung");
}
