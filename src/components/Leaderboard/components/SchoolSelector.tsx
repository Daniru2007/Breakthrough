//ts-nocheck
// import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { GraduationCap } from 'lucide-react';
// import { cn } from '../lib/utils';
import schools from '../data/schools.json';

interface SchoolSelectorProps {
  open: boolean;
  onSelect: (school: string) => void;
}

export function SchoolSelector({ open, onSelect }: SchoolSelectorProps) {
  return (
    <Dialog open={open} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Select Your School
          </DialogTitle>
          <DialogDescription>
            Choose your school to connect with your academic community
          </DialogDescription>
        </DialogHeader>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search schools..." />
          <CommandList>
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup heading="Schools" className="max-h-[300px] overflow-auto">
              {schools.schools.map((school) => (
                <CommandItem
                  key={school}
                  value={school}
                  onSelect={() => onSelect(school)}
                  className="cursor-pointer"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>{school}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}