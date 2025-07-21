import { Dispatch, FC, SetStateAction } from "react";
import {
  CalendarEvent,
  colorOptions,
} from "@/src/views/calendar/model/CalendarViewModel";
import BaseInput from "@/src/shared/ui/Input";

interface EventFormModalProps {
  visible: boolean;
  selectedEvent?: CalendarEvent;
  formData: {
    title: string;
    date: string;
    time: string;
    description: string;
    color: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      title: string;
      date: string;
      time: string;
      description: string;
      color: string;
    }>
  >;
  onSave: () => void;
  onCancel: () => void;
}

const EventFormModal: FC<EventFormModalProps> = ({
  visible,
  selectedEvent,
  formData,
  setFormData,
  onSave,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedEvent ? "일정 수정" : "새 일정 추가"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                제목
              </label>
              <BaseInput
                type={"text"}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="일정 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                날짜
              </label>
              <BaseInput
                type="date"
                max={"9999-12-31"}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                시간
              </label>
              <BaseInput
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                설명
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-inset"
                rows={3}
                placeholder="일정 설명 (선택사항)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                색상
              </label>
              <div className="grid grid-cols-6 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() =>
                      setFormData({ ...formData, color: color.value })
                    }
                    className={`w-8 h-8 rounded-full ${color.value} ${
                      formData.color === color.value
                        ? "ring-2 ring-offset-2 ring-indigo-500"
                        : ""
                    }`}
                    title={color.name}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
