"use client";
import { Mail, MapPin, Phone, Calendar, Clock, ArrowRight, MessageSquare, Send, X, RefreshCcw, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
// --- CONFIGURATION ---
const BASE_TIME_SLOTS = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

// --- STEP 1: SCHEDULING ---
const SchedulingStep = ({ onNext }: any) => {
    const [viewDate, setViewDate] = useState(new Date()); 
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState<{time: string, booked: boolean}[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const daysInMonth = useMemo(() => new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate(), [viewDate]);
    const firstDayOfMonth = useMemo(() => {
        const day = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; 
    }, [viewDate]);
    
    const daysOfWeek = ['M','T','W','T','F','S'];

    const handleDayClick = async (day: number) => {
        const dateString = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateString);
        setSelectedTime('');
        setLoadingSlots(true);

        try {
            const res = await fetch(`/api/bookings?date=${dateString}`);
            if (!res.ok) throw new Error("Failed to fetch slots");
            const { bookedTimes } = await res.json();
            
            const computedSlots = BASE_TIME_SLOTS.map(time => ({
                time,
                booked: bookedTimes?.includes(time) || false
            }));
            setAvailableSlots(computedSlots);
        } catch (error) {
            console.error("Failed to fetch slots", error);
            setAvailableSlots(BASE_TIME_SLOTS.map(time => ({ time, booked: false })));
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleConfirmBooking = () => {
        if (!selectedDate || !selectedTime) return;
        onNext(`${selectedDate} at ${selectedTime}`);
    };

    const isDateDisabled = (checkDate: Date) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        return checkDate < today; 
    };

    const emptySlotsCount = firstDayOfMonth === 6 ? 0 : firstDayOfMonth;

    return (
        <>
            <div className="mb-6 pb-6 border-b border-white/5">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Calendar size={20} className="text-purple-400" /> 1. Select Date & Time
                </h3>
                <p className="text-slate-400 text-sm">Real-time availability • 30 min Session</p>
            </div>

            <h4 className="text-sm font-bold text-white mb-2 capitalize">
                {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            
            <div className="grid grid-cols-6 gap-2 mb-6 text-center text-sm">
                {daysOfWeek.map((d,i) => (<div key={i} className="text-slate-500 font-bold py-2">{d}</div>))}
                {Array.from({length: emptySlotsCount}).map((_, i) => (<div key={`empty-${i}`} className="py-2"></div>))}
                
                {Array.from({length: daysInMonth}).map((_, i) => {
                    const day = i + 1;
                    const checkDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                    if (checkDate.getDay() === 0) return null;

                    const isDisabled = isDateDisabled(checkDate);
                    const dateString = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isSelected = selectedDate === dateString;

                    return (
                        <button 
                            key={day} disabled={isDisabled} onClick={() => handleDayClick(day)}
                            className={`py-2 rounded-lg transition-colors text-base font-medium ${isDisabled ? 'text-slate-800 cursor-not-allowed' : 'hover:bg-blue-600/20 hover:text-blue-400 cursor-pointer text-slate-300'} ${isSelected ? '!bg-blue-600 !text-white shadow-lg shadow-blue-900/50' : ''}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-3">
                <h4 className="text-sm font-bold text-white mb-2">Available Slots {selectedDate && `(${selectedDate})`}</h4>
                {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3 min-h-[100px]">
                        {loadingSlots ? (
                            <div className="col-span-2 flex items-center justify-center text-slate-500 gap-2"><Loader2 size={16} className="animate-spin" /> Checking availability...</div>
                        ) : (
                            availableSlots.map((slot) => (
                                <button 
                                    key={slot.time} disabled={slot.booked} onClick={() => setSelectedTime(slot.time)}
                                    className={`w-full py-3 border rounded-lg text-sm transition-colors flex items-center justify-center gap-2 ${slot.booked ? 'bg-red-900/10 border-red-500/10 text-red-500/50 cursor-not-allowed decoration-slice' : (selectedTime === slot.time ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800 border-white/10 text-slate-300 hover:border-blue-500 hover:text-blue-400')}`}
                                >
                                    {slot.booked ? <>Booked <X size={14} /></> : <><Clock size={14} /> {slot.time} {selectedTime === slot.time && <Check size={16} />}</>}
                                </button>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="h-[100px] flex items-center justify-center border border-dashed border-white/10 rounded-xl text-slate-600 text-sm">Select a date to view slots</div>
                )}
            </div>

            <button onClick={handleConfirmBooking} disabled={!selectedTime} className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none">
                Confirm Booking <ArrowRight size={18} />
            </button>
        </>
    );
};

// --- STEP 2: CONTACT DETAILS ---
const DetailsStep = ({ onBack, onFinalSubmit, selectedDateTime, initialSubject }: any) => {
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', subject: initialSubject, message: `Strategy Session Booking: ${selectedDateTime}`,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const [date, time] = selectedDateTime.split(' at ');

        try {
            const dbRes = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, date, time })
            });
            
            if (!dbRes.ok) {
                const errorText = await dbRes.text();
                throw new Error(`Server Error (${dbRes.status}).`);
            }

            const dbData = await dbRes.json();
            if (!dbData.success) throw new Error(dbData.message || "Slot unavailable.");

            onFinalSubmit({ type: 'success', message: 'Booking confirmed! We have sent a confirmation to your email.' });

        } catch (error: any) {
            console.error("Submission Error:", error);
            onFinalSubmit({ type: 'error', message: error.message || 'Network error during submission.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const InputClass = "w-full p-3 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:border-blue-500 transition-colors disabled:opacity-50";

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium mb-4">
                <ArrowRight size={16} className="rotate-180 mr-2" /> Back to Calendar
            </button>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><MessageSquare size={20} className="text-emerald-400" /> 2. Your Details</h3>
            <p className="text-sm text-slate-400 mb-6">You selected: <span className="font-medium text-white">{selectedDateTime}</span>.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Your Full Name*" value={formData.name} onChange={handleChange} className={InputClass} required disabled={isSubmitting} />
                    <input type="email" name="email" placeholder="Email Address*" value={formData.email} onChange={handleChange} className={InputClass} required disabled={isSubmitting} />
                </div>
                <input type="text" name="company" placeholder="Company (Optional)" value={formData.company} onChange={handleChange} className={InputClass} disabled={isSubmitting} />
                <input type="text" name="subject" placeholder="Subject*" value={formData.subject} onChange={handleChange} className={InputClass} required disabled={isSubmitting} />
                <textarea name="message" rows={4} placeholder="Briefly describe your project needs..." value={formData.message} onChange={handleChange} className={InputClass} required disabled={isSubmitting} />
                
                <button type="submit" disabled={isSubmitting} className="w-full mt-4 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-3 disabled:bg-slate-700 disabled:shadow-none">
                    {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <><Send size={18} /> Confirm & Submit Booking</>}
                </button>
            </form>
        </motion.div>
    );
};

const StatusScreen = ({ status, onReset }: any) => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 md:p-12">
        <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${status.type === 'success' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-600/20 text-red-400'}`}>
            {status.type === 'success' ? <Check size={32} /> : <X size={32} />}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{status.type === 'success' ? 'Booking Successful!' : 'Booking Failed'}</h3>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto">{status.message}</p>
        <button onClick={onReset} className="px-6 py-3 bg-slate-800 border border-white/10 text-white rounded-xl hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 mx-auto">
            <RefreshCcw size={16} /> Book Another
        </button>
    </motion.div>
);

export default function ContactFormUI() {
    const [step, setStep] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const { trackEvent } = useAnalytics();

    // Client-side only logic for URL params
    const mockQuery = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('discuss') : null;
    const initialSubject = mockQuery ? `Project Discussion: ${mockQuery}` : "Technical Strategy Inquiry";

    const handleNextStep = (dateTime: string) => { setSelectedDateTime(dateTime); setStep(2); };
    const handleFinalResult = (result: { type: string, message: string }) => { 
        setStatus(result); 
        setStep(3); 
        
        if (result.type === 'success') {
            trackEvent('booking_success', 'Contact Form', 'Strategy Call Confirmed');
        } else {
            trackEvent('booking_error', 'Contact Form', result.message);
        }
    };
    const handleReset = () => { setStep(1); setSelectedDateTime(''); setStatus({ type: '', message: '' }); };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-6">{step === 3 ? 'COMPLETE' : `STEP ${step} OF 2`}</div>
                <h1 className="text-5xl font-extrabold text-white mb-6">Let's engineer <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">your next breakthrough.</span></h1>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed">This isn't a sales pitch. It's a 30-minute technical strategy session. We'll audit your current stack, identify bottlenecks, and propose a high-level roadmap.</p>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/5 pb-2">Direct Contact</h2>
                <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-4 text-slate-300"><div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400"><Mail size={20} /></div><div><div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Email Us</div><a href="mailto:info@mirabytes.io" className="font-medium hover:text-white transition-colors">info@mirabytes.io</a></div></div>
                    <div className="flex items-center gap-4 text-slate-300"><div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400"><Phone size={20} /></div><div><div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Call Us</div><a href="tel:+441473956537" className="font-medium hover:text-white transition-colors">+44 1473 956537</a></div></div>
                    <div className="flex items-center gap-4 text-slate-300"><div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400"><MapPin size={20} /></div><div><div className="text-xs text-slate-500 uppercase tracking-wider font-bold">HQ Address</div><div className="font-medium">London, UK (Global Remote)</div><div className="text-xs text-slate-600">Office 12373, 182-184 High Street North, E6 2JA</div></div></div>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-full opacity-30" />
                <motion.div layout className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 1 && <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}><SchedulingStep onNext={handleNextStep} /></motion.div>}
                        {step === 2 && <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}><DetailsStep onBack={() => setStep(1)} onFinalSubmit={handleFinalResult} selectedDateTime={selectedDateTime} initialSubject={initialSubject} /></motion.div>}
                        {step === 3 && <StatusScreen status={status} onReset={handleReset} />}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}