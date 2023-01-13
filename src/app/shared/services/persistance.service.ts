import { Injectable } from "@angular/core"
/**
 * Ми хочемо, щоб дані про юзера зберігалися після перезавантаження сторінки.
 * Тому ми складаємо токен в локал сторедж. Звідти ми можемо його забрати
 * і запитати сервер, чи токен ще валідний - зафетчити юзера.
 */


// setter/getter - localStorage
@Injectable()
export class PersistanceService {
    set(key: string, data: any): void {
        try {
            window.localStorage.setItem(key, JSON.stringify(data))
        } catch (e) {
            console.error('Error saving to localStorage', e)
        }
    }

    get(key: string): any {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (error) {
            console.error('Error getting data from localStorage', error)
            return null;
        }
    }
}
