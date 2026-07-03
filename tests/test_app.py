from app import app


def test_home_page_loads():
    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200
    assert b"AI Industrial Design Assistant" in response.data


def test_generate_endpoint_returns_design_document():
    client = app.test_client()

    response = client.post(
        "/generate",
        json={"idea": "A modular desk organizer for design students"}
    )

    data = response.get_json()

    assert response.status_code == 200
    assert "Design Brief" in data
    assert "Target User" in data
    assert "CMF Suggestions" in data
    assert "Rendering Prompt" in data


def test_generate_endpoint_includes_project_type():
    client = app.test_client()

    response = client.post(
        "/generate",
        json={
            "idea": "A sustainable public product for urban parks",
            "project_type": "Design Competition Topic"
        }
    )

    data = response.get_json()

    assert response.status_code == 200
    assert "Design Brief" in data
    assert "Project Type: Design Competition Topic" in data["Design Brief"]