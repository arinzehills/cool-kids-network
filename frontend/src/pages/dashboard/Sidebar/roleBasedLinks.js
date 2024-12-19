// src/utils/roleBasedLinks.js
export const filterLinksByRole = (links, role) => {
  switch (role) {
    case "Maintainer":
      return links;
    case "Cool Kid":
      return links.filter(
        (link) => link.name !== "Users" && link.name !== "Admin"
      );
    default:
      return links.filter((link) => link.name !== "Admin");
  }
};
