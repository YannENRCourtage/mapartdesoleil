import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

const UserConsumptionPage = () => {
    return (
        <>
            <Helmet>
                <title>Ma Consommation - Ma part de soleil</title>
                <meta name="description" content="Suivez votre consommation d'énergie et les économies réalisées." />
            </Helmet>

            <div className="container py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-3xl font-bold">Ma Consommation</h1>
                    <p className="text-muted-foreground mt-2">
                        Suivez vos données de consommation et les économies que vous réalisez.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12"
                >
                    <Card className="max-w-2xl mx-auto text-center p-8 bg-gray-50">
                        <CardHeader>
                            <div className="mx-auto bg-amber-100 p-4 rounded-full w-fit">
                                <Construction className="h-12 w-12 text-amber-500" />
                            </div>
                            <CardTitle className="mt-4 text-2xl font-bold">Page en construction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Nous travaillons activement sur cette page pour vous apporter des graphiques détaillés et une analyse précise de votre consommation. Revenez bientôt ! 🚀
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default UserConsumptionPage;