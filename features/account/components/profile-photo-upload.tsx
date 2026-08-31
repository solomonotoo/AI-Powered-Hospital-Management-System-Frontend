"use client";

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePhotoUploadProps {
    currentPhoto?: string;
    userName?: string;
}

export function ProfilePhotoUpload({
    currentPhoto,
    userName = 'Dr John Mensah',
}: ProfilePhotoUploadProps) {
    const [photo, setPhoto] = useState<string | undefined>(currentPhoto);

    const handleUpload = () => {
        toast.success('Profile photo updated successfully');
    };

    const handleRemove = () => {
        setPhoto(undefined);
        toast.info('Profile photo removed');
    };

    return (
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Profile Photo</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                    <Avatar className="h-28 w-28 border-2 border-border shadow-md">
                        <AvatarImage src={photo || `https://avatar.vercel.sh/${userName}`} />
                        <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                            {userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                        <Button size="sm" onClick={handleUpload} className="gap-1.5">
                            <Upload className="h-3.5 w-3.5" />
                            <span>Upload New Photo</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemove}
                            className="gap-1.5 text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        JPG, PNG or WEBP • Maximum 5 MB
                    </p>
                </div>
            </div>
        </div>
    );
}
