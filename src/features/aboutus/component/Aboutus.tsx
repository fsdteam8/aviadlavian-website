"use client";

import React from "react";
import {
  Target,
  Eye,
  Users,
  BookOpen,
  Award,
  Globe,
  Book,
  Accessibility,
} from "lucide-react";

const Aboutus = () => {
  return (
    <div className="w-full  mx-auto p-6 space-y-8 font-sans">
      <h1 className="text-3xl font-bold text-slate-800">About Us</h1>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-full">
              <Target className="w-6 h-6 text-[#24b4a5]" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Our Mission</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-full">
              <Eye className="w-6 h-6 text-[#24b4a5]" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Our Vision</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Platform Impact Section */}
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Platform Impact</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex justify-center">
              <Users className="w-10 h-10 text-slate-700" />
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-800">15000+</p>
              <p className="text-slate-500 font-medium">Users</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <BookOpen className="w-10 h-10 text-slate-700" />
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-800">1200+</p>
              <p className="text-slate-500 font-medium">Research</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <Award className="w-10 h-10 text-slate-700" />
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-800">450+</p>
              <p className="text-slate-500 font-medium">Awards</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <Globe className="w-10 h-10 text-slate-700" />
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-800">85+</p>
              <p className="text-slate-500 font-medium">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Core Values Section */}
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center space-y-12">
        <h2 className="text-2xl font-bold text-slate-800">Our Core Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Book className="w-10 h-10 text-slate-700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">
                Research Based
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <Users className="w-10 h-10 text-slate-700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">
                Collaborative
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <Accessibility className="w-10 h-10 text-slate-700" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">Accessible</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
