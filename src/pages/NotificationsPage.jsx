import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Bell, Check, Trash2, Settings, Mail, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockNotifications } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({ email: true, sms: false, push: true });
  const [tempPreferences, setTempPreferences] = useState(preferences);

  const handleDelete = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée.",
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Toutes les notifications marquées comme lues",
      description: "Toutes vos notifications ont été marquées comme lues."
    });
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
    toast({
      title: "Toutes les notifications supprimées",
      variant: "destructive"
    });
  }
  
  const savePreferences = () => {
    setPreferences(tempPreferences);
    toast({
        title: "Préférences sauvegardées",
        description: "Vos paramètres de notification ont été mis à jour."
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Helmet>
        <title>Notifications - Ma part de soleil</title>
        <meta name="description" content="Consultez toutes vos notifications et gérez vos préférences de communication sur Ma part de soleil." />
      </Helmet>

      <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-lg text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Toutes vos notifications sont lues'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleMarkAllAsRead} variant="outline" size="sm" disabled={unreadCount === 0}>
                  <Check className="w-4 h-4 mr-2" /> Tout marquer comme lu
                </Button>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-2" /> Paramètres</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Préférences de notification</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-notif-modal" className="flex items-center gap-2"><Mail size={16}/> Email</Label>
                                <Switch id="email-notif-modal" checked={tempPreferences.email} onCheckedChange={(checked) => setTempPreferences({...tempPreferences, email: checked})} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="sms-notif-modal" className="flex items-center gap-2"><MessageSquare size={16}/> SMS</Label>
                                <Switch id="sms-notif-modal" checked={tempPreferences.sms} onCheckedChange={(checked) => setTempPreferences({...tempPreferences, sms: checked})} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-notif-modal" className="flex items-center gap-2"><Smartphone size={16}/> Push</Label>
                                <Switch id="push-notif-modal" checked={tempPreferences.push} onCheckedChange={(checked) => setTempPreferences({...tempPreferences, push: checked})} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={savePreferences}>Sauvegarder</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button onClick={handleDeleteAll} variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-2" /> Tout supprimer</Button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-amber-400 bg-amber-50/30' : ''}`}>
                  <CardContent className="p-6 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>{notification.title}</h3>
                        </div>
                        <p className={`mb-3 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>{notification.message}</p>
                        <div className="text-sm text-muted-foreground">{new Date(notification.date).toLocaleString('fr-FR')}</div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(notification.id)}><Trash2 className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {notifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Bell className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune notification
              </h3>
              <p className="text-gray-600">Vous n'avez aucune nouvelle notification pour le moment.</p>
            </motion.div>
          )}
      </div>
    </>
  );
};

export default NotificationsPage;