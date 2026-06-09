import Button from "../../../components/ui/Button/Button.jsx";
import bathIcon from "../../../assets/icons/Bathhouse.png";
import homeIcon from "../../../assets/icons/Home.png";
import { useState, useEffect } from "react";
import { getCookie } from "../../../utils/cookies.js";
import DatePicker from 'react-datepicker'
import {ru} from 'date-fns/locale'
import {Listbox} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {API_URL} from "../../../shared/api.js";
import {getCSRF} from "../../../api/csrf.js";

export default function CreateOrder() {
    const resetForm = () => {
        setDateRange([null, null]);
        setGuests(2);
        setHomeDates({
            check_in: "",
            check_out: "",
            extra_place: false,
            with_pet: false,
        });
        setForm({
            comment: ""
        });
    };
    const [openCalendar, setOpenCalendar] = useState(false)
    const [openBathCalendar, setOpenBathCalendar] = useState(false)
    const [bathDateTime, setBathDateTime] = useState(null)
    const isMobile = window.innerWidth < 480;
    const formatDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const [houseAvailability, setHouseAvailability] = useState({})
    const [bathAvailability, setBathAvailability] = useState({})
    const isTimeDisabled = (date) => {
        return bathAvailability.some(slot => {
            const start = new Date(slot.start);
            const end = new Date(slot.end);
            return date >= start && date <= end;
        });
    };
    const loadAvailability = () => {
        fetch(`${API_URL}/api/booking/house-availability/`)
            .then(res => res.json())
            .then(data => setHouseAvailability(data))
        fetch(`${API_URL}/api/booking/bath-availability/`)
            .then(res => res.json())
            .then(data => setBathAvailability(data))
    }
    useEffect(() => {
        loadAvailability()
    }, []);
    const [dateRange, setDateRange] = useState([null ,null])
    const [startDate, endDate] = dateRange
    const disabledDates = Object.entries(houseAvailability)
        .filter(([_, count]) => count >= 2)
        .map(([date]) => new Date(date))

    const formatLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    return new Date(y, m - 1, d);
};
    const partiallyBookedDates = Object.entries(houseAvailability)
    .filter(([_, count]) => count === 1)
    .map(([date]) => formatLocalDate(date));


    const [bookingType, setBookingType] = useState({
        house: false,
        bath: false
    });
    const [form, setForm] = useState({
        comment: ""
    });
    const [guests, setGuests] = useState(2);
    const [homeDates, setHomeDates] = useState({
        check_in: "",
        check_out: "",
        extra_place: false,
        with_pet: false,
    });
    const [bathData, setBathData] = useState({
        check_in: "",
        duration: null,
        steam_program: null,
        whisk: "",
        bath_tub: false,
        bath_tub_filling: false,
        steaming: false,
    });
    const [bathPrograms, setBathPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const whiskOptions =[
        { value: "birch", label: "Берёза" },
        { value: "oak", label: "Дуб" },
        { value: "fir", label: "Пихта" }
    ]
    useEffect(() => {
        fetch(`${API_URL}/api/bath-programs/`)
            .then(res => res.json())
            .then(data => setBathPrograms(data))
            .catch(err => console.log(err))
    }, []);
  const handleSubmit = async () => {
    const payload = {
        comment: form.comment,
        home_booking: bookingType.house
            ? {
                check_in: homeDates.check_in,
                check_out: homeDates.check_out,
                guests_count: guests,
                extra_place: homeDates.extra_place,
                with_pet: homeDates.with_pet,
            }
            : null,
        bath_booking: bookingType.bath
            ? {
                check_in: bathData.check_in,
                duration: bathData.duration,
                bath_tub: bathData.bath_tub,
                bath_tub_filling: bathData.bath_tub_filling,
                steaming: bathData.steaming,
                steam_program: bathData.steam_program,
                whisk: bathData.whisk,
            }
            : null,
    };

    try {
        const csrftoken = await getCSRF()
        console.log(payload);
        const res = await fetch(`${API_URL}/api/booking/create/`, {
            method: "POST",
            credentials: "include", // 👈 КРИТИЧНО
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("booking error:", data);
            return;
        }

        alert("Заявка создана");

        resetForm();
        loadAvailability();

    } catch (err) {
        console.error("Network error:", err);
    }
};
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-3xl font-semibold text-h">Создание заявки</h2>
                <p className="text-gray-500 mt-2">Выберите необходимые услуги и заполните параметры бронирования</p>
            </div>
            {/* TYPE */}
            <div>
                <h3 className="text-xl text-input font-medium mb-4">Что хотите забронировать?</h3>
                <div className="grid md:grid-cols-2 gap-5">
                    <button type="button"
                        onClick={() =>
                            setBookingType(prev => ({
                                ...prev,
                                house: !prev.house
                            }))
                        }
                        className={` rounded-2xl border p-6 text-left transition
                            ${bookingType.house
                                ? "border-h bg-h/5"
                                : "border-gray-200 hover:border-h/50"
                            }
                        `}
                    >
                        <div className="text-4xl mb-3 w-12 h-12"><img src={homeIcon} alt="Домик" /></div>
                        <h4 className="text-lg font-medium">Домик</h4>
                        <p className="text-sm text-gray-500 mt-2">Проживание в уютном гостевом доме</p>
                    </button>
                    <button type="button"
                        onClick={() =>
                            setBookingType(prev => ({
                                ...prev,
                                bath: !prev.bath
                            }))
                        }
                        className={`
                            rounded-2xl border p-6 text-left transition
                            ${bookingType.bath
                                ? "border-h bg-h/5"
                                : "border-input/20 hover:border-h/50"
                            }
                        `}
                    >
                        <div className="text-4xl mb-3"><img src={bathIcon} alt="Баня" className="w-12 h-12" /></div>
                        <h4 className="text-lg font-medium">Баня</h4>
                        <p className="text-sm text-gray-500 mt-2">Парение и отдых в банном комплексе</p>
                    </button>
                </div>
            </div>
            {/* домик */}
          {bookingType.house && (
            <section className="rounded-2xl border border-input/20 p-6 flex flex-col gap-5 w-full">
                <h3 className="text-input text-2xl font-medium">Домик</h3>
                {/* LAYOUT: CALENDAR + FORM */}
                <div className="flex flex-col lg:flex-row w-full gap-6">
                    {/* календарь */}
                    <div className="lg:w-2/6 shrink-0 relative">
                        <button type="button" onClick={() => setOpenCalendar(prev => !prev)}
                            className="w-full border border-input/20 rounded-xl p-3 text-left text-md text-input hover:border-h transition">
                            {startDate && endDate
                                ? `${formatDate(startDate)} → ${formatDate(endDate)}`
                                : "Выбрать даты"
                            }
                        </button>
                        {openCalendar && (
                            <div className="w-full absolute z-50 mt-3 bg-white rounded-2xl shadow-xl border border-border/30">
                                <DatePicker
                                    selected={startDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                    locale={ru}
                                    excludeDates={disabledDates}
                                    dayClassName={(date) => {
                                    const dateString = formatDate(date);
                                    if (houseAvailability[dateString] >= 2) {
                                        return "house-full";
                                    }
                                    if (houseAvailability[dateString] === 1) {
                                        return "house-half";
                                    }

                                    return "";
                                }}
                                    onChange={(update) => {
                                        setDateRange(update);
                                        if (update[0] && update[1]) {
                                            setHomeDates(prev => ({
                                                ...prev,
                                                check_in: formatDate(update[0]),
                                                check_out: formatDate(update[1])
                                            }));
                                            setOpenCalendar(false); // закрываем после выбора
                                        }
                                    }}
                                />
                            </div>
                        )}
                        {openCalendar && isMobile && (
                            <div className="fixed inset-0 z-[100] bg-white flex flex-col">
                                <div className="flex items-center justify-between p-5 border-b">
                                    <h3 className="text-xl font-medium">Выбор дат</h3>
                                    <button type="button" onClick={() => setOpenCalendar(false)}>✕</button>
                                </div>
                                <div className="flex-1 overflow-auto flex justify-center p-4">
                                    <DatePicker
                                        selected={startDate}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        monthsShown={1}
                                        inline
                                        locale={ru}
                                        excludeDates={disabledDates}
                                        calendarClassName="airbnb-calendar"
                                        onChange={(update) => {
                                            setDateRange(update);
                                            setHomeDates(prev => ({
                                                ...prev,
                                                check_in: formatDate(update[0]),
                                                check_out: formatDate(update[1])
                                            }));
                                        }}
                                    />
                                </div>
                                <div className="p-5 border-t">
                                    <Button classname="w-full" onClick={() => setOpenCalendar(false)}>Сохранить</Button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* форма */}
                    <div className="flex flex-col gap-6 flex-1">
                        {/* гости */}
                        <div>
                            <label className="block mb-3 text-sm text-gray-500">Количество гостей</label>
                            <div className="flex items-center gap-4">
                                <button type="button" className="w-10 h-10 rounded-xl border border-input/20"
                                    onClick={() => {
                                        const newGuests = Math.max(1, guests - 1);
                                        setGuests(newGuests);
                                        if (newGuests <= 4) {
                                            setHomeDates(prev => ({
                                                ...prev,
                                                extra_place: false
                                            }));
                                        }
                                    }}
                                >−</button>
                                <span className="text-lg font-medium">{guests}</span>
                                <button type="button" className="w-10 h-10 rounded-xl border border-input/20"
                                    onClick={() => {
                                        const newGuests = Math.min(6, guests + 1);
                                        setGuests(newGuests);
                                        if (newGuests > 4) {
                                            setHomeDates(prev => ({
                                                ...prev,
                                                extra_place: true
                                            }));
                                        }
                                    }}
                                >+</button>
                            </div>
                        </div>
                        {/* опции */}
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3">
                                <input type="checkbox" checked={homeDates.extra_place}
                                    onChange={(e) => {
                                        if (!e.target.checked && guests > 4) {
                                            setGuests(4);
                                        }
                                        setHomeDates(prev => ({
                                            ...prev,
                                            extra_place: e.target.checked
                                        }));
                                    }}
                                />Дополнительное место</label>
                            <label className="flex items-center gap-3">
                                <input type="checkbox"
                                    onChange={(e) =>
                                        setHomeDates(prev => ({
                                            ...prev,
                                            with_pet: e.target.checked
                                        }))
                                    }
                                />Буду с животными</label>
                        </div>
                    </div>
                </div>
            </section>
          )}
            {/* баня */}
            {bookingType.bath && (
                <section className="rounded-2xl border border-input/20 p-6 flex flex-col gap-5">
                    <h3 className="text-input text-2xl font-medium">Баня</h3>
                    <button type="button" onClick={() => setOpenBathCalendar(true)}
                    className="w-full border border-input/20 rounded-xl p-3 text-left text-md text-input hover:border-h transition">
                        {bathDateTime
                            ? bathDateTime.toLocaleString()
                            : "Выбрать дату и время"
                        }
                    </button>
                       {openBathCalendar && !isMobile && (
                            <div className="absolute z-50 mt-3 bg-white border border-border/30 rounded-2xl shadow-xl p-4">
                                <div className="flex gap-6">
                                    {/* LEFT: CALENDAR */}
                                    <DatePicker selected={bathDateTime}
                                        onChange={(date) => {
                                            setBathDateTime(date);
                                            setBathData(prev => ({
                                                ...prev,
                                                check_in: date.toISOString()
                                            }));
                                        }}
                                        inline calendarClassName="airbnb-calendar"
                                    />
                                    {/* RIGHT: TIME PANEL */}
                                    <div className="w-[160px] flex flex-col gap-3">
                                        <p className="text-sm text-gray-500">Время</p>
                                        <input type="time" className="input"
                                            value={
                                                bathDateTime
                                                    ? bathDateTime.toTimeString().slice(0,5)
                                                    : ""
                                            }
                                            onChange={(e) => {
                                                const [h, m] = e.target.value.split(":");
                                                const updated = new Date(bathDateTime || new Date());
                                                updated.setHours(h);
                                                updated.setMinutes(m);
                                                setBathDateTime(updated);
                                                setBathData(prev => ({
                                                    ...prev,
                                                    check_in: updated.toISOString()
                                                }));
                                            }}
                                        />
                                        <button className="mt-2 py-2 rounded-xl bg-h text-white hover:bg-hover transition" onClick={() => setOpenBathCalendar(false)}>Готово</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    {openBathCalendar && isMobile && (
                        <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden max-w-[100vw]">
                            {/* HEADER */}
                            <div className="flex items-center justify-between p-5 border-b">
                                <h3 className="text-xl font-medium">Выбор даты и времени</h3>
                                <button type="button" onClick={() => setOpenBathCalendar(false)}>✕</button>
                            </div>
                            <div className="flex-1 overflow-y-auto flex flex-col items-center p-4 gap-6 min-h-0">
                                {/* календарь */}
                                <DatePicker
                                    selected={bathDateTime}
                                    onChange={(date) => {
                                        setBathDateTime(date);
                                        setBathData(prev => ({
                                            ...prev,
                                            check_in: date.toISOString()
                                        }));
                                    }} inline locale={ru} calendarClassName="airbnb-calendar"
                                />
                                {/* время */}
                                <div className="w-full max-w-[280px]">
                                    <label className="text-sm text-gray-500">Время</label>
                                    <input type="time" className="input w-full mt-2"
                                        value={
                                            bathDateTime
                                                ? bathDateTime.toTimeString().slice(0,5)
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const [h, m] = e.target.value.split(":");
                                            const updated = new Date(bathDateTime || new Date());
                                            updated.setHours(h);
                                            updated.setMinutes(m);
                                            setBathDateTime(updated);
                                            setBathData(prev => ({
                                                ...prev,
                                                check_in: updated.toISOString()
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="p-5 border-t">
                                <button className="w-full py-3 rounded-xl bg-h text-white" onClick={() => setOpenBathCalendar(false)}>Сохранить</button>
                            </div>
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Продолжительность</p>
                        <div className="flex flex-wrap gap-3">
                            {[2, 3, 4].map(hours => (
                                <button key={hours} type="button"
                                    onClick={() =>
                                        setBathData(prev => ({
                                            ...prev,
                                            duration: hours
                                        }))
                                    }
                                    className={`px-5 py-2 rounded-xl border transition
                                        ${
                                            bathData.duration === hours
                                                ? "bg-h text-white border-h"
                                                : "border-gray-300 hover:border-h"
                                        }`}
                                >
                                    {hours} часа
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Программа парения</p>
                       <Listbox
                            value={selectedProgram}
                            onChange={(value) => {
                                setSelectedProgram(value || null);

                                setBathData(prev => ({
                                    ...prev,
                                    steam_program: value || null,
                                    duration: null,
                                    whisk: ""
                                }));
                            }}
                       >
                            <div className="relative">
                                <Listbox.Button
                                    className="
                                        relative w-full cursor-pointer rounded-xl
                                        border border-input/20 bg-white
                                        py-3 pl-4 pr-10 text-left
                                        text-input shadow-sm
                                        focus:outline-none focus:ring-2 focus:ring-h/20
                                    "
                                >
                                    <span className="block truncate">
                                        {selectedProgram
                                            ? bathPrograms.find(
                                                p => String(p.id) === String(selectedProgram)
                                            )?.name
                                            : "Без программы"}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-body"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Listbox.Options
                                    className="
                                        absolute z-50 mt-2 max-h-60 w-full
                                        overflow-auto rounded-xl
                                        border border-input/20 bg-white
                                        shadow-xl
                                    "
                                >
                                    <Listbox.Option
                                        value={null}
                                        className={({ active }) =>
                                            `
                                            cursor-pointer px-4 py-3 transition
                                            ${active
                                                ? "bg-bg text-hover"
                                                : "text-input"
                                            }
                                            `
                                        }
                                    >Без программы
                                    </Listbox.Option>
                                    {bathPrograms.map(program => (
                                        <Listbox.Option
                                            key={program.id}
                                            value={program.id}
                                            className={({ active }) =>
                                                `
                                                cursor-pointer px-4 py-3 transition
                                                ${active
                                                    ? "bg-bg text-hover"
                                                    : "text-input"
                                                }
                                                `
                                            }
                                        >
                                            {({ selected }) => (
                                                <div className="flex items-center justify-between">
                                                    <span>
                                                        {program.name}
                                                    </span>
                                                    {selected && (
                                                        <CheckIcon
                                                            className="h-5 w-5 text-h"
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-3">Веник</p>
                            <Listbox value={bathData.whisk}
                                onChange={(value) =>
                                    setBathData(prev => ({
                                        ...prev,
                                        whisk: value
                                    }))
                                }
                                disabled={!!selectedProgram}
                            >
                                <div className="relative">
                                    <Listbox.Button
                                        className={`
                                            relative w-full cursor-pointer rounded-xl
                                            border border-input/20 bg-white
                                            py-3 pl-4 pr-10 text-left
                                            text-input shadow-sm transition
                                            focus:outline-none focus:ring-2 focus:ring-h/20
                                            ${selectedProgram ? "opacity-50 cursor-not-allowed" : ""}
                                        `}
                                    >
                                        <span className="block truncate">
                                            {bathData.whisk
                                                ? whiskOptions.find(w => w.value === bathData.whisk)?.label
                                                : "Выберите веник"}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <ChevronUpDownIcon className="h-5 w-5 text-body" />
                                        </span>
                                    </Listbox.Button>
                                    <Listbox.Options
                                        className="
                                            absolute z-50 mt-2 max-h-60 w-full
                                            overflow-auto rounded-xl
                                            border border-border bg-white
                                            shadow-xl
                                        "
                                    >
                                        <Listbox.Option
                                            value=""
                                            className={({ active }) =>
                                                `
                                                cursor-pointer px-4 py-3 transition
                                                ${active ? "bg-bg text-hover" : "text-input"}
                                                `
                                            }
                                        >Выберите веник</Listbox.Option>
                                        {whiskOptions.map((whisk) => (
                                            <Listbox.Option key={whisk.value} value={whisk.value}
                                                className={({ active }) =>
                                                    `
                                                    cursor-pointer px-4 py-3 transition
                                                    ${active ? "bg-bg text-hover" : "text-input"}
                                                    `
                                                }
                                            >
                                                {({ selected }) => (
                                                    <div className="flex items-center justify-between">
                                                        <span>{whisk.label}</span>
                                                        {selected && (
                                                            <CheckIcon className="h-5 w-5 text-h" />
                                                        )}
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className='flex items-center gap-3'>
                            <input type="checkbox"
                                onChange={(e) =>
                                    setBathData(prev => ({
                                        ...prev,
                                        bath_tub: e.target.checked
                                    }))
                                }
                            />Купель</label>
                        <label className='flex items-center gap-3'>
                            <input type="checkbox"
                                onChange={(e) =>
                                    setBathData(prev => ({
                                        ...prev,
                                        bath_tub_filling: e.target.checked
                                    }))
                                }
                            />Наполнение купели</label>
                        <label className='flex items-center gap-3'>
                            <input type="checkbox"
                                onChange={(e) =>
                                    setBathData(prev => ({
                                        ...prev,
                                        steaming: e.target.checked
                                    }))
                                }
                            />Парение</label>
                    </div>
                </section>
            )}
            {/* COMMENT */}
            <section className="rounded-2xl border border-input/20 p-6">
                <h3 className="text-input text-xl font-medium mb-4">Комментарий</h3>
                <textarea rows="5" className="w-full resize-none border border-h p-3 rounded-md" placeholder="Ваши пожелания..."
                    onChange={(e) =>
                        setForm({ comment: e.target.value })
                    }
                />
            </section>
            <Button classname="self-start" onClick={handleSubmit}>Отправить заявку</Button>
        </div>
    );
}