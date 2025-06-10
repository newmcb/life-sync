import React, { FC } from "react";
import { SecretItem } from "@/src/views/secret/model/SecretModel";

interface SecretBreadcrumbProps {
  items: SecretItem[];
  currentPath: string[];
  setCurrentPath: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<SecretItem | null>>;
}

const SecretBreadcrumb: FC<SecretBreadcrumbProps> = ({
  items,
  currentPath,
  setCurrentPath,
  setSelectedItem,
}) => {
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ id: null as string | null, name: "메인" }];
    // let currentId = null as string | null;
    for (const id of currentPath) {
      const item = items.find((item) => item.id === id);
      if (item) {
        breadcrumbs.push({ id: item.id, name: item.name });
        // currentId = item.id;
      }
    }
    return breadcrumbs;
  };

  return (
    <div className="mb-4 flex flex-wrap items-center space-x-2 text-sm md:text-base">
      {getBreadcrumbs().map((crumb, index) => (
        <div key={crumb.id || "root"} className="flex items-center">
          {index > 0 && <span className="mx-2 text-gray-500">/</span>}
          <button
            onClick={() => {
              setCurrentPath(currentPath.slice(0, index));
              setSelectedItem(null);
            }}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {crumb.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SecretBreadcrumb;
