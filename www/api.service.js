// www/api.service.js

class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Método auxiliar privado para manejar las respuestas
    async _handleResponse(response) {
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Error API: ${response.status} - ${text}`);
        }
        // Si la respuesta es 204 No Content (común en DELETE), no intentamos parsear JSON
        if (response.status === 204) return null;
        
        // Intentamos devolver JSON, si falla devolvemos texto o null
        try {
            return await response.json();
        } catch (err) {
            return null;
        }
    }

    // --- CATEGORÍAS ---

    async getCategories() {
        const response = await fetch(`${this.baseUrl}/categories`);
        return this._handleResponse(response);
    }

    async createCategory(name) {
        const response = await fetch(`${this.baseUrl}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        return this._handleResponse(response);
    }

    async deleteCategory(id) {
        const response = await fetch(`${this.baseUrl}/categories/${id}`, {
            method: 'DELETE'
        });
        return this._handleResponse(response);
    }

    // --- SITIOS (SITES) ---

    async getAllSites() {
        const response = await fetch(`${this.baseUrl}/sites`);
        return this._handleResponse(response);
    }

    async getSitesByCategory(categoryId) {
        const response = await fetch(`${this.baseUrl}/categories/${categoryId}`);
        // Nota: Tu backend devuelve un objeto { id, name, sites: [...] } en este endpoint
        // así que devolveremos todo el objeto.
        return this._handleResponse(response);
    }

    async createSite(categoryId, siteData) {
        const response = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(siteData)
        });
        return this._handleResponse(response);
    }

    async deleteSite(siteId) {
        const response = await fetch(`${this.baseUrl}/sites/${siteId}`, {
            method: 'DELETE'
        });
        return this._handleResponse(response);
    }
}