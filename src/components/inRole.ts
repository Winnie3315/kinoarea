import { RoleItem } from "../Types";

export function InRole(item: RoleItem): HTMLElement {
    const roleItem = document.createElement('a');
    const img = document.createElement('img');
    const personName = document.createElement('h3');
    const roleName = document.createElement('h4');

    img.src = item.profile_path ? `https://image.tmdb.org/t/p/original${item.profile_path}` : '/public/images/not_found_photo_mini.jpg';
    img.alt = '';

    personName.innerHTML = item.name;
    roleName.innerHTML = item.character;

    roleItem.classList.add('role_item');
    personName.classList.add('person_name');
    roleName.classList.add('role_name');
    roleItem.href = `/actor/?id=${item.id}`

    roleItem.append(img, personName, roleName);

    return roleItem;
}
